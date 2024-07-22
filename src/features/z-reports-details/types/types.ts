import {typeZReport} from "../../../entities/z-report/model/types";
import {typeUser} from "../../../entities/user-profile/model/state-slice";


export interface typeZReportDetailsProps {
    isNotFound: boolean | null,
    isZReportLoading: boolean,
    zReportData: typeZReport | null,
}
