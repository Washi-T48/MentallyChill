import axios from "axios";
import dotenv from "dotenv";

import Message from "../Helpers/message.js";
import { lookupAppointment } from "../Models/appointment.js";
import { lookupStaff } from "./staff.js";
import { lookupFormResult } from "./forms_result.js";

dotenv.config();

async function formResultNotify(result_id) {
    const formResult = await lookupFormResult(result_id)
    const { user_id, forms_type, result, line_uid } = formResult[0];
    const notify = new Message();
    // notify.push(
    //     line_uid,
    //     notify.flex(
    //         //TODO
    //     )
    // );
}

async function appointmentNotify(booking_id) {
    const appointmentInfo = await lookupAppointment(booking_id);
    const { staff_id, date, time, status, contact_method, line_uid } = appointmentInfo[0];
    const staff = await lookupStaff(staff_id);
    const staffInfo = `${staff[0].name} ${staff[0].surname} (${staff[0].nickname})`;
    const notify = new Message();
    notify.push(
        line_uid,
        notify.flex(
            {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "การนัดหมาย",
                            "size": "xl",
                            "align": "center",
                            "weight": "bold"
                        },
                        {
                            "type": "image",
                            "url": "https://picsum.photos/300",
                            "size": "full"
                        },
                        {
                            "type": "text",
                            "text": "เลขที่",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": "เลขที่ ",
                                    "size": "lg",
                                    "weight": "bold"
                                },
                                {
                                    "type": "span",
                                    "text": booking_id
                                }
                            ],
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "วันที่",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": "วันที่ ",
                                    "size": "lg",
                                    "weight": "bold"
                                },
                                {
                                    "type": "span",
                                    "text": date
                                }
                            ],
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "เวลา",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": "เวลา ",
                                    "size": "lg",
                                    "weight": "bold"
                                },
                                {
                                    "type": "span",
                                    "text": time
                                }
                            ],
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "ผู้ให้คำปรึกษา",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": "ผู้ให้คำปรึกษา ",
                                    "size": "lg",
                                    "weight": "bold"
                                },
                                {
                                    "type": "span",
                                    "text": staffInfo
                                }
                            ],
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "ช่องทาง",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": "ช่องทาง ",
                                    "size": "lg",
                                    "weight": "bold"
                                },
                                {
                                    "type": "span",
                                    "text": contact_method
                                }
                            ],
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "สถานะ",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": "สถานะ ",
                                    "size": "lg",
                                    "weight": "bold"
                                },
                                {
                                    "type": "span",
                                    "text": status
                                }
                            ],
                            "wrap": true
                        },
                    ]
                }
            }
        )
    );
}

export {
    formResultNotify,
    appointmentNotify,
}