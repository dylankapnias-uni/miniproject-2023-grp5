import { AgeGroup, Ethnicity, Gender, ProfileStatus } from '../enums';

export interface IPersonalDetails {
  name: string,
  bio?: string | null | undefined,
  age?: AgeGroup | null | undefined;
  gender?: Gender | null | undefined;
  ethnicity?: Ethnicity | null | undefined;
  status?: ProfileStatus | null | undefined;
  sexuality?: string
}
