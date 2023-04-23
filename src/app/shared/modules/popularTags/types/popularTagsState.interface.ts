import {PopularTagType} from "../../../types/popularTag.type";

export interface PopularTagsStateInterface {
  data: PopularTagType[] | null
  error: null
  isLoading: boolean
}
