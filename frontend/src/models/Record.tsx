export interface Record {
  id: string;
  ref_code: string;
  firstname_en: string;
  lastname_en: string;
  firstname_zh: string;
  lastname_zh: string;
  id_number: string;
  gender: string;
  date_of_birth: string;
  booking_date: string;
  booking_time: string;
  address: string;
  place_of_birth: string;
  brand_of_vaccine: string;
  verify_identity: boolean;
  status: string;
  created: string;
  modified: string;
}

export interface RecordCreateForm {
  firstname_en: string;
  lastname_en: string;
  firstname_zh: string;
  lastname_zh: string;
  id_number: string;
  gender: string;
  date_of_birth: string;
  booking_date: string;
  booking_time: string;
  address: string;
  place_of_birth: string;
  brand_of_vaccine: string;
}
