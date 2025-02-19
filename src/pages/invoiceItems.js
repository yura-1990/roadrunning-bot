import useInvoice from "../zustand/invoice";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";


export default function InvoiceItem() {
    const getInvoiceItems = useInvoice(state => state.getInvoiceItems);
    const invoiceItems = useInvoice(state => state.state.invoiceItems);

    const { t, i18n } = useTranslation();

    useEffect(()=>{
        getInvoiceItems(i18n.language)
    }, [i18n.language])

    return (
        <div className="d-flex align-items-start flex-wrap w-100">
            <div className="nav flex-column nav-pills nav-custom-link me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {
                     invoiceItems?.invoices.map((invoice) => invoice?.invoice_items?.length > 0 && <button
                                                                        className="nav-link border bg-theme text-white"
                                                                        id={`v-pills-${invoice.id}-tab`}
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target={`#v-pills-${invoice.id}`}
                                                                        type="button" role="tab"
                                                                        aria-controls={`v-pills-${invoice.id}`}
                                                                        aria-selected="true"> #{invoice.invoice_number} </button>
                    )
                }
            </div>
            <div className="tab-content flex-grow-1 mt-2 mt-lg-0" id="v-pills-tabContent">
                {
                    invoiceItems?.invoices.map((invoice) => invoice?.invoice_items?.length > 0 && <div className="tab-pane fade "
                                                                 id={`v-pills-${invoice.id}`}
                                                                 role="tabpanel"
                                                                 aria-labelledby={`v-pills-${invoice.id}-tab`}>
                        <ul className="list-group w-100 mb-3">
                            {
                                invoice.invoice_items.map((el) => <li className="list-group-item  lh-condensed">
                                    <div className={'d-flex justify-content-between'}>
                                        <div className="d-flex flex-column align-items-start">
                                            <h4 className="my-0 text-theme fw-bold">Total</h4>
                                            <small className="text-muted py-2">{el?.marathon?.marathon_type?.name}</small>
                                            <small className="text-muted py-2">{el?.number_type?.type} <span className='text-theme fw-bold'>({ el.number })</span></small>
                                            <h5 className="text-info fw-bold py-2">Status</h5>
                                        </div>
                                        <div className="d-flex flex-column align-items-end">
                                            <h5 className="text-muted fw-bold">{el.description} UZS</h5>
                                            <small className="text-muted py-2">{el.marathon_price} UZS</small>
                                            <small className="text-muted py-2">{el.number_price} UZS</small>
                                            <h5 className="text-info fw-bold py-2">
                                                {invoice.is_paid
                                                    ? <span>Paid <i className="fa-regular fa-square-check"></i></span>
                                                    : <span>No paid <i className="fa-regular fa-square-xmark"></i> </span>}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column align-items-center ">
                                        <hr />
                                        <div className='qrcode-image border border-2 border-theme'>
                                            <QRCodeCanvas
                                                value={`https://roadrunning.uz/show-qrcode/${el.id}`}
                                                size={212}
                                                bgColor="#ffffff"
                                                fgColor="#0B904F"
                                                level='Q'
                                                marginSize={1}
                                            />
                                        </div>
                                    </div>
                                </li>)
                            }

                        </ul>

                    </div>)
                }
            </div>
        </div>

    )
}