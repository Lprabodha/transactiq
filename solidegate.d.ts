declare module "@solidgate/node-sdk" {
  export class Api {
    constructor(publicKey: string, secretKey: string);
    formMerchantData(
      data: Record<string, string | number | boolean | undefined>
    ): {
      toObject(): Record<string, string | number | boolean | undefined>;
    };
  }
}
