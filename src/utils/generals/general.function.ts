import generatedOtp from 'otp-generator';
import nodemailer from 'nodemailer';
import { PASS } from '@/configs/env.config';
import { logger } from '../loggers';
import { sendEmailResetPasswordTemplate } from '../html-tamplate';
import User from '@/models/user.model';
import ProductTransaction from '@/models/product-transaction';

interface ISendEmailPayload {
  to: string;
  subject: string;
  text: string;
  token: string;
}

interface IPayloadPagination {
  page: number;
  limit: number;
  sort: string;
  order: string;
  sortDefault?: string;
}

export const useOtpGenerated = () => {
  return generatedOtp.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

export const sendEmail = async ({ to, subject, text, token }: ISendEmailPayload) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'putu031216@gmail.com',
      pass: PASS,
    },
  });

  const foundUser = await User.findOne({
    where: { email: to, deletedDt: null },
  });

  await transporter
    .sendMail({
      from: 'noreply',
      to: to,
      subject: subject,
      text: text,
      html: sendEmailResetPasswordTemplate({ recipient: foundUser.fullname, token }),
    })
    .then(async (info) => {
      logger.info('Email sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })
    .catch((error) => {
      logger.error('Error occurred: %s', error.message), console.log(error);
    });
};

export const pagination = (payload: IPayloadPagination) => {
  const offset = ((payload.page || 1) - 1) * (payload.limit || 10);
  const sorting = payload.sort ? `${payload.sort} ${payload.order}` : `${payload.sortDefault || 'createdDt'} desc`;

  return { offset, sorting };
};

export const calculateGrowPercent = (thisMonth: ProductTransaction[], lastMonth: ProductTransaction[]) => {
  const totalThisMonth = thisMonth.reduce((acc, curr) => acc + curr.amount, 0);
  const totalLastMonth = lastMonth.reduce((acc, curr) => acc + curr.amount, 0);

  if (totalLastMonth === 0) return ((totalThisMonth - totalLastMonth) / 1).toFixed(2) + '%';

  const result = ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;
  return result.toFixed(2) + '%';
};

export const calculateGrowPercentThisWeek = (thisWeek: ProductTransaction[], lastWeek: ProductTransaction[]) => {
  const totalThisWeek = thisWeek.reduce((acc, curr) => acc + curr.amount, 0);
  const totalLastWeek = lastWeek.reduce((acc, curr) => acc + curr.amount, 0);

  if (totalLastWeek === 0) return ((totalThisWeek - totalLastWeek) / 1).toFixed(2) + '%';

  const result = ((totalThisWeek - totalLastWeek) / totalLastWeek) * 100;
  return result.toFixed(2) + '%';
};
