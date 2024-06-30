import { sequelize } from '@/configs/database.config';
import { CreditTransactionDto, GetListJournalDto, JournalSaldoDto, TimeframeDto } from '@/dto/journal.dto';
import { HttpException } from '@/global/http-exception';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import Journal from '@/models/journal.model';
import Store from '@/models/store.model';
import { JournalStatus } from '@/utils/enums';
import { pagination } from '@/utils/generals/general.function';
import { ResponsePagination } from '@/utils/generals/generel.model';
import moment from 'moment';
import { Op, QueryTypes } from 'sequelize';
import { Service } from 'typedi';
import { v4 } from 'uuid';

@Service()
export default class JournalService {
  public setSaldo = async (session: IAuthTokenPayload, dto: JournalSaldoDto) => {
    const { saldo, storeId } = dto;

    const foundStore = await Store.findByPk(storeId);

    if (!foundStore) {
      throw new HttpException(400, 'Store not found');
    }

    const setSaldo = await Journal.create({
      id: v4(),
      storeId,
      status: JournalStatus.DEBIT,
      amount: saldo,
      description: 'Initial saldo',
      createdBy: session.userId,
      createdDt: new Date(),
    });

    return setSaldo;
  };

  public creditTransaction = async (session: IAuthTokenPayload, dto: CreditTransactionDto) => {
    const { amount, storeId, description } = dto;

    const foundStore = await Store.findByPk(storeId);

    if (!foundStore) {
      throw new HttpException(400, 'Store not found');
    }

    const credit = await Journal.create({
      id: v4(),
      storeId,
      status: JournalStatus.CREDIT,
      amount,
      description,
      createdBy: session.userId,
      createdDt: new Date(),
    });

    return credit;
  };

  public async calculateIncomeAndExpenses(storeId: string, dto: TimeframeDto) {
    const { monthTimeFrame } = dto;

    // Calculate start and end dates for the current month
    const startOfMonth = monthTimeFrame ? moment(monthTimeFrame).startOf('month').add(7, 'hour').toDate() : moment().startOf('month').add(7, 'hour').toDate();
    const endOfMonth = monthTimeFrame ? moment(monthTimeFrame).endOf('month').add(7, 'hour').toDate() : moment().endOf('month').add(7, 'hour').toDate();

    // Calculate start and end dates for the previous month
    const startOfPreviousMonth = monthTimeFrame
      ? moment(monthTimeFrame).subtract(1, 'month').startOf('month').add(7, 'hour').toDate()
      : moment().subtract(1, 'month').startOf('month').add(7, 'hour').toDate();
    const endOfPreviousMonth = monthTimeFrame
      ? moment(monthTimeFrame).subtract(1, 'month').endOf('month').add(7, 'hour').toDate()
      : moment().subtract(1, 'month').endOf('month').add(7, 'hour').toDate();

    // Fetch income and expenses for the current month
    const currentMonthEntries = await Journal.findAll({
      where: {
        storeId,
        createdDt: {
          [Op.gt]: startOfMonth,
          [Op.lte]: endOfMonth,
        },
      },
    });

    // Fetch income and expenses for the previous month
    const previousMonthEntries = await Journal.findAll({
      where: {
        storeId,
        createdDt: {
          [Op.gt]: startOfPreviousMonth,
          [Op.lte]: endOfPreviousMonth,
        },
      },
    });

    // Calculate total income and expenses for the current month
    const totalIncomeThisMonth = currentMonthEntries.filter((entry) => entry.status === 'DEBIT').reduce((sum, entry) => sum + entry.amount, 0);

    const totalExpensesThisMonth = currentMonthEntries.filter((entry) => entry.status === 'CREDIT').reduce((sum, entry) => sum + entry.amount, 0);

    // Calculate total income and expenses for the previous month
    const totalIncomeLastMonth = previousMonthEntries.filter((entry) => entry.status === 'DEBIT').reduce((sum, entry) => sum + entry.amount, 0);

    const totalExpensesLastMonth = previousMonthEntries.filter((entry) => entry.status === 'CREDIT').reduce((sum, entry) => sum + entry.amount, 0);

    const incomeCalculateThisMonth =
      totalIncomeThisMonth > 0 ? ((totalIncomeThisMonth / (totalIncomeThisMonth + totalExpensesThisMonth)) * 100).toFixed(2) + '%' : '0%';
    const expensesCalculateThisMonth =
      totalExpensesThisMonth > 0 ? ((totalExpensesThisMonth / (totalIncomeThisMonth + totalExpensesThisMonth)) * 100).toFixed(2) + '%' : '0%';

    const provitThisMonth = totalIncomeThisMonth - totalExpensesThisMonth;
    const provitLastMonth = totalIncomeLastMonth - totalExpensesLastMonth;
    const marginProv = provitThisMonth - provitLastMonth;

    // Calculate percentage growth for income and expenses
    const provitGrowth =
      provitLastMonth === 0
        ? provitThisMonth > 0
          ? provitThisMonth + '%'
          : 0 + '%'
        : (((provitThisMonth - provitLastMonth) / provitLastMonth) * 100).toFixed(2) + '%';

    return {
      income: {
        totalIncomeThisMonth,
        incomeCalculateThisMonth,
        countIncomeThisMonth: currentMonthEntries.filter((entry) => entry.status === 'DEBIT').length,
      },
      expenses: {
        totalExpensesThisMonth,
        expensesCalculateThisMonth,
        countExpensesThisMonth: currentMonthEntries.filter((entry) => entry.status === 'CREDIT').length,
      },
      provit: {
        provitThisMonth,
        provitGrowth,
        marginProv,
      },
    };
  }

  public getListJournal = async (storeId: string, dto: GetListJournalDto) => {
    const { monthTimeFrame, page, sort, order, limit } = dto;
    const { offset, sorting } = pagination({ page, sort, order, limit });

    const search = dto.search ? `%${dto.search}%` : '%';

    const startOfMonth = monthTimeFrame
      ? moment(monthTimeFrame).startOf('month').add(7, 'hour').format('YYYY-MM-DD')
      : moment().startOf('month').add(7, 'hour').format('YYYY-MM-DD');
    const endOfMonth = monthTimeFrame
      ? moment(monthTimeFrame).endOf('month').add(7, 'hour').format('YYYY-MM-DD')
      : moment().endOf('month').add(7, 'hour').format('YYYY-MM-DD');

    const queryData = `
      select
        j.id,
        j.amount,
        j.status,
        j.description,
        j.code,
        j.created_dt as createdDt,
        u.fullname as createdBy
      from journal j
      join user u on u.user_id = j.created_by
      where j.store_id = '${storeId}'
      and j.created_dt between '${startOfMonth}' and '${endOfMonth} + interval 1 day'
      and u.fullname like '${search}'
      group by j.id
      order by ${sorting}
      limit ${limit} offset ${offset}
    `;

    const data = await sequelize.query(queryData, { type: QueryTypes.SELECT });

    const queryTotalData = `
      select
        count(j.id) as totalData
      from journal j
      join user u on u.user_id = j.created_by
      where j.store_id = '${storeId}'
      and j.created_dt between '${startOfMonth}' and '${endOfMonth} + interval 1 day'
      and u.fullname like '${search}'
      group by j.id
    `;

    const totalDataJournal = await sequelize.query(queryTotalData, { type: QueryTypes.SELECT });

    const totalPage = Math.ceil(totalDataJournal.length / (limit || 10));
    const totalData = totalDataJournal.length;

    const payload = new ResponsePagination();
    payload.totalPage = totalPage;
    payload.totalData = totalData;
    payload.currentPage = Number(page) || 1;
    payload.items = data;

    return payload;
  };
}
