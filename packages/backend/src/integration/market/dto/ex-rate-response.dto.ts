export class ExRateResponseDto {
  success: true;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [k in string]: number;
  };
}

export class ExRateBadResponseDto {
  success: false;
  error: {
    code: number;
    type: string;
    info: string;
  };
}
