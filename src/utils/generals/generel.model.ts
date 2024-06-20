export class PayloadSendEmail {
  to: string;
  subject: string;
  text: string;
}

export class ResponsePagination {
  totalPage: number;
  totalData: number;
  currentPage: number;
  items: any[];
}
