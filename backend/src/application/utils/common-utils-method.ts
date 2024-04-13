import { injectable } from "inversify";
import moment from "moment-timezone";
import { constants } from "../constants/constants";

@injectable()
class CommonUtils {
  bytesToMB(bytes: number) {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2); // Fixed to two decimal places
  }

  removeUndefinedInArrayOfObject(data: any) {
    return data?.filter((item: any) => !!item);
  }

  convertUtcDateToLocal(
    date: any,
    timeZone: string | undefined,
    format: string | undefined
  ) {
    const result =
      date && timeZone
        ? format
          ? moment.tz(date, timeZone).format(format)
          : moment.tz(date, timeZone).format(constants.DEFAULT_FORMAT)
        : date;
    return result;
  }
}

export default new CommonUtils();
