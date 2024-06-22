import { CreditTransactionDto, JournalSaldoDto } from '@/dto/journal.dto';
import { HttpException } from '@/global/http-exception';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import Journal from '@/models/journal.model';
import Store from '@/models/store.model';
import { JournalStatus } from '@/utils/enums';
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
}
