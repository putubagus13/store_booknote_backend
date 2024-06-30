import { sequelize } from '@/configs/database.config';
import { AnalitycDto } from '@/dto/analityc.dto';
import { HttpException } from '@/global/http-exception';
import ProductTransaction from '@/models/product-transaction';
import Store from '@/models/store.model';
import { calculateGrowPercent, calculateGrowPercentThisWeek } from '@/utils/generals/general.function';
import moment from 'moment';
import { Op, QueryTypes } from 'sequelize';
import { Service } from 'typedi';

@Service()
export default class AnalitycService {
  public getCardAnalityic = async (storeId: string, dto: AnalitycDto) => {
    const foundStore = await Store.findOne({ where: { id: storeId, deletedDt: null } });
    if (!foundStore) throw new HttpException(404, 'Store not found');

    const productTransactionThisMonth = await ProductTransaction.findAll({
      where: {
        storeId,
        createdDt: {
          [Op.lte]: dto.monthTimeFrame ? moment(dto.monthTimeFrame).endOf('month').toDate() : moment().endOf('month').toDate(),
          [Op.gt]: dto.monthTimeFrame ? moment(dto.monthTimeFrame).startOf('month').toDate() : moment().startOf('month').toDate(),
        },
      },
    });

    const productTransactionLastMonth = await ProductTransaction.findAll({
      where: {
        storeId,
        createdDt: {
          [Op.lte]: dto.monthTimeFrame
            ? moment(dto.monthTimeFrame).subtract(1, 'month').endOf('month').toDate()
            : moment().subtract(1, 'month').endOf('month').toDate(),
          [Op.gt]: dto.monthTimeFrame
            ? moment(dto.monthTimeFrame).subtract(1, 'month').startOf('month').toDate()
            : moment().subtract(1, 'month').startOf('month').toDate(),
        },
      },
    });

    const growPercentThisMonth = calculateGrowPercent(productTransactionThisMonth, productTransactionLastMonth);

    const startDateThisWeek = dto.weekTimeFrame ? moment(dto.weekTimeFrame.split(',')[0]).toDate() : moment().startOf('week').toDate();
    const endDateThisWeek = dto.weekTimeFrame ? moment(dto.weekTimeFrame.split(',')[1]).toDate() : moment().endOf('week').toDate();

    const productTransactionThisWeek = await ProductTransaction.findAll({
      where: {
        storeId,
        createdDt: {
          [Op.lte]: endDateThisWeek,
          [Op.gte]: startDateThisWeek,
        },
      },
    });

    const startDateLastWeek = dto.weekTimeFrame
      ? moment(dto.weekTimeFrame.split(',')[0]).subtract(1, 'week').toDate()
      : moment().startOf('week').subtract(2, 'week').toDate();
    const endDateLastWeek = dto.weekTimeFrame ? moment(dto.weekTimeFrame.split(',')[0]).toDate() : moment().startOf('week').subtract(1, 'week').toDate();

    const productTransactionLastWeek = await ProductTransaction.findAll({
      where: {
        storeId,
        createdDt: {
          [Op.gte]: startDateLastWeek,
          [Op.lt]: endDateLastWeek,
        },
      },
    });
    const growPercentThisWeek = calculateGrowPercentThisWeek(productTransactionThisWeek, productTransactionLastWeek);

    return {
      growPercentThisMonth,
      growPercentThisWeek,
      totalTransactionThisMonth: productTransactionThisMonth.length,
      totalTransactionThisWeek: productTransactionThisWeek.length,
      totalAmountThisMonth: productTransactionThisMonth.reduce((acc, curr) => acc + curr.amount, 0),
      totalAmountThisWeek: productTransactionThisWeek.reduce((acc, curr) => acc + curr.amount, 0),
    };
  };

  public chartAnalityc = async (storeId: string, dto: AnalitycDto) => {
    const foundStore = await Store.findOne({ where: { id: storeId, deletedDt: null } });
    if (!foundStore) throw new HttpException(404, 'Store not found');
    const startDateMonth = dto.monthTimeFrame
      ? moment(dto.monthTimeFrame).startOf('month').format('YYYY-MM-DD')
      : moment().startOf('month').format('YYYY-MM-DD');
    const endDateMonth = dto.monthTimeFrame ? moment(dto.monthTimeFrame).endOf('month').format('YYYY-MM-DD') : moment().endOf('month').format('YYYY-MM-DD');

    // const startDateWeek = dto.weekTimeFrame ? moment(dto.weekTimeFrame.split(',')[0]).format('YYYY-MM-DD') : moment().startOf('week').format('YYYY-MM-DD');
    // const endDateWeek = dto.weekTimeFrame ? moment(dto.weekTimeFrame.split(',')[1]).format('YYYY-MM-DD') : moment().endOf('week').format('YYYY-MM-DD');

    const queryDataMonth = `
        select
            sum(pt.amount) as amount,
            date(pt.created_dt) as createdDt
        from product_transaction pt 
        where 
            pt.store_id = "${storeId}"
            and pt.created_dt between "${startDateMonth}" and "${endDateMonth}"
        group by date(pt.created_dt)
        order by date(pt.created_dt) asc
    `;

    const dataMonth = await sequelize.query(queryDataMonth, { type: QueryTypes.SELECT });
    const barier = dto.monthTimeFrame ? moment(dto.monthTimeFrame).endOf('month').date() : moment().endOf('month').date();

    for (let day = 1; day <= barier; day++) {
      const found = dataMonth.find((item: any) => moment(item.createdDt).date() === day);
      if (!found) {
        dataMonth.push({ createdDt: moment().date(day).format('YYYY-MM-DD'), amount: 0 });
      }
    }

    //top product
    const quertTopProduct = `
        select
            sum(pt.product_quantity) as totalQuantity,
            sum(pt.amount) as amount,
            p.id,
            p.name 
        from product_transaction pt 
        join product p on p.id = pt.product_id 
        where 
            pt.store_id = "${storeId}"
            and pt.created_dt between "${startDateMonth}" and "${endDateMonth}"
        group by p.id, p.name, pt.product_id 
    `;

    const topProduct = await sequelize.query(quertTopProduct, { type: QueryTypes.SELECT });

    return {
      chartAnalitycTransaction: dataMonth.sort((a: any, b: any) => moment(a.createdDt).date() - moment(b.createdDt).date()),
      chartAnalitycTopProduct: topProduct,
    };
  };
}
