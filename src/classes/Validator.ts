class Validator {
  public static validateRfc(rfc: string): boolean {
    const regex = /^([A-ZÑ&]{3,4})-?([0-9]{2})([0-1][0-9])([0-3][0-9])-?([A-Z\d]{3})$/i;
    return regex.test(rfc);
  }
  public static validateIdCcp(IdCcp: string) {
    const regex = /^C{3}[a-f0-9A-F]{5}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}$/;
    return regex.test(IdCcp);
  }
}
export default Validator;
