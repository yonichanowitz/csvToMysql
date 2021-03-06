var stuffToSkipList = [
    ' id                                ',
    ' batch_id                          ',
    ' user_id                           ',
    ' name                              ',
    ' actionable_type                   ',
    ' actionable_id                     ',
    ' target_type                       ',
    ' target_id                         ',
    ' model_type                        ',
    ' model_id                          ',
    ' fields                            ',
    ' status                            ',
    ' exception                         ',
    ' created_at                        ',
    ' updated_at                        ',
    ' original                          ',
    ' changes                           ',
    ' id                                ',
    ' city                              ',
    ' state                             ',
    ' country                           ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' address_line_1                    ',
    ' address_line_2                    ',
    ' city                              ',
    ' state                             ',
    ' zip                               ',
    ' order                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' first_name                        ',
    ' last_name                         ',
    ' dob                               ',
    ' gender                            ',
    ' notes                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' first_name                        ',
    ' last_name                         ',
    ' relationship                      ',
    ' phone                             ',
    ' email                             ',
    ' order                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' diagnosis                         ',
    ' stage                             ',
    ' cell_description                  ',
    ' diagnosis_date                    ',
    ' doctor_id                         ',
    ' remission_date                    ',
    ' notes                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' doctor_id                         ',
    ' start_date                        ',
    ' end_date                          ',
    ' notes                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' is_medical                        ',
    ' title                             ',
    ' body                              ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' insurance_plan_id                 ',
    ' is_primary                        ',
    ' created_at                        ',
    ' updated_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' offered_item_id                   ',
    ' completed                         ',
    ' created_at                        ',
    ' updated_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' number                            ',
    ' extension                         ',
    ' type                              ',
    ' order                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' service_event_id                  ',
    ' attended                          ',
    ' created_at                        ',
    ' updated_at                        ',
    ' id                                ',
    ' name                              ',
    ' order                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' client_id                         ',
    ' doctor_id                         ',
    ' type                              ',
    ' dosage                            ',
    ' notes                             ',
    ' start_date                        ',
    ' end_date                          ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' first_name                        ',
    ' nickname                          ',
    ' last_name                         ',
    ' legal_first_name                  ',
    ' legal_last_name                   ',
    ' dob                               ',
    ' birthplace_id                     ',
    ' gender                            ',
    ' marital_status                    ',
    ' status_id                         ',
    ' is_manhattan                      ',
    ' is_limited                        ',
    ' is_confidential                   ',
    ' email                             ',
    ' contact_primary                   ',
    ' deceased_date                     ',
    ' notes                             ',
    ' coupons                           ',
    ' call_date                         ',
    ' referred_by                       ',
    ' intake_complete                   ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' doctor_id                         ',
    ' hospital_id                       ',
    ' order                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' id                                ',
    ' doctor_id                         ',
    ' insurance_plan_id                 ',
    ' id                                ',
    ' doctor_id                         ',
    ' office_id                         ',
    ' order                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' id                                ',
    ' first_name                        ',
    ' last_name                         ',
    ' specialty_id                      ',
    ' subspecialty                      ',
    ' work_phone                        ',
    ' work_extension                    ',
    ' cell_phone                        ',
    ' fax                               ',
    ' email                             ',
    ' notes                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' connection                        ',
    ' queue                             ',
    ' payload                           ',
    ' exception                         ',
    ' failed_at                         ',
    ' id                                ',
    ' name                              ',
    ' phone                             ',
    ' address_line_1                    ',
    ' address_line_2                    ',
    ' city                              ',
    ' state                             ',
    ' zip                               ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' company                           ',
    ' plan                              ',
    ' type                              ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' name                              ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' migration                         ',
    ' batch                             ',
    ' id                                ',
    ' title                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' name                              ',
    ' address_line_1                    ',
    ' address_line_2                    ',
    ' city                              ',
    ' state                             ',
    ' zip                               ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' person_id                         ',
    ' person_type                       ',
    ' language_id                       ',
    ' id                                ',
    ' client_id                         ',
    ' doctor_id                         ',
    ' notes                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' is_group                          ',
    ' service_id                        ',
    ' location                          ',
    ' date_time                         ',
    ' service_provider_id               ',
    ' notes                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' first_name                        ',
    ' last_name                         ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' service_id                        ',
    ' service_tag_id                    ',
    ' id                                ',
    ' title                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' title                             ',
    ' is_group                          ',
    ' is_limited                        ',
    ' coupons                           ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' title                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' first_name                        ',
    ' last_name                         ',
    ' email                             ',
    ' email_verified_at                 ',
    ' password                          ',
    ' remember_token                    ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' category_id                       ',
    ' name                              ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' volunteer_id                      ',
    ' day                               ',
    ' start                             ',
    ' end                               ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' name                              ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
    ' id                                ',
    ' volunteer_id                      ',
    ' service_event_id                  ',
    ' id                                ',
    ' volunteer_id                      ',
    ' area_id                           ',
    ' id                                ',
    ' first_name                        ',
    ' last_name                         ',
    ' dob                               ',
    ' cell_phone                        ',
    ' home_phone                        ',
    ' email                             ',
    ' address_line_1                    ',
    ' address_line_2                    ',
    ' city                              ',
    ' state                             ',
    ' zip                               ',
    ' location                          ',
    ' user_id                           ',
    ' skills                            ',
    ' notes                             ',
    ' created_at                        ',
    ' updated_at                        ',
    ' deleted_at                        ',
];
console.log(stuffToSkipList.length);