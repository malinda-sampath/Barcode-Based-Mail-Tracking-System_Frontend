import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import {
  Printer,
  X,
  Mail as MailIcon,
  User,
  Home,
  Type,
  FileText,
  Calendar,
} from "lucide-react";

interface Mail {
  branchCode: string;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  mailDescription: string;
  barcodeId: string;
  barcodeImage: string;
  insertDateTime: string;
  updateDateTime: string;
}

const MailDetailsPopup = ({
  mail,
  open,
  onClose,
}: {
  mail: Mail | null;
  open: boolean;
  onClose: () => void;
}) => {
  if (!mail) return null;

  const getBarcodeImageSrc = () => {
    if (!mail.barcodeImage) return "/barcode-placeholder.png";
    if (mail.barcodeImage.startsWith("data:image")) return mail.barcodeImage;
    return `data:image/png;base64,${mail.barcodeImage}`;
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${mail.barcodeId}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
              
              :root {
                --primary: #1e40af;
                --primary-light: #3b82f6;
                --secondary: #6b7280;
                --light-bg: #f9fafb;
                --border: #e5e7eb;
                --text: #111827;
                --text-light: #6b7280;
              }
              
              body { 
                font-family: 'Inter', sans-serif;
                background: white; 
                color: var(--text);
                padding: 0;
                margin: 0;
                line-height: 1.6;
              }
              
              .page {
                max-width: 600px;
                margin: 0 auto;
                padding: 2.5rem;
              }
              
              .header { 
                text-align: center; 
                margin-bottom: 2.5rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid var(--border);
              }
              
              .header h1 { 
                font-size: 1.75rem; 
                font-weight: 700; 
                color: var(--primary);
                margin: 0 0 0.5rem 0;
                letter-spacing: -0.5px;
              }
              
              .header p { 
                color: var(--text-light); 
                font-size: 0.9rem;
                margin: 0;
              }
              
              .barcode-container { 
                text-align: center; 
                margin: 2rem 0 3rem;
                padding: 2rem;
                border: 1px dashed var(--border);
                border-radius: 0.75rem;
                background: var(--light-bg);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
              }
              
              .barcode-container img { 
                height: 140px; 
                object-fit: contain; 
                margin-bottom: 1rem;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
              }
              
              .barcode-container p { 
                font-weight: 600; 
                font-size: 1.25rem;
                color: var(--text);
                letter-spacing: 1.5px;
                margin: 0;
              }
              
              .details-container { 
                background: white; 
                border-radius: 0.75rem; 
                padding: 0;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                overflow: hidden;
                border: 1px solid var(--border);
              }
              
              .detail-row { 
                display: flex; 
                padding: 1.25rem 1.5rem;
                align-items: center;
              }
              
              .detail-row:nth-child(even) {
                background-color: var(--light-bg);
              }
              
              .detail-label { 
                font-weight: 500; 
                color: var(--primary);
                min-width: 140px;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              
              .detail-value { 
                color: var(--text); 
                font-weight: 400;
                flex: 1;
                font-size: 0.95rem;
              }
              
              .highlight {
                color: var(--primary);
                font-weight: 600;
              }
              
              .footer { 
                margin-top: 3rem; 
                text-align: center; 
                font-size: 0.8rem; 
                color: var(--text-light);
                padding-top: 1.5rem;
                border-top: 1px solid var(--border);
              }
              
              .logo {
                width: 120px;
                margin-bottom: 1rem;
                opacity: 0.8;
              }
              
              @media print {
                @page {
                  size: auto;
                  margin: 15mm;
                }
                body {
                  padding: 0;
                }
                .page {
                  padding: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="header">
                <!-- Add your logo here if available -->
                <!-- <img src="path/to/logo.png" class="logo" alt="Company Logo"> -->
                <h1>Mail Tracking Details</h1>
                <p>Generated on ${new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
              </div>
              
              <div class="barcode-container">
                <img src="${getBarcodeImageSrc()}" alt="Barcode" />
                <p>${mail.trackingNumber}</p>
              </div>
              
              <div class="details-container">
                <div class="detail-row">
                  <span class="detail-label">Branch Code</span>
                  <span class="detail-value highlight">${mail.branchCode}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Sender</span>
                  <span class="detail-value">${mail.senderName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Receiver</span>
                  <span class="detail-value">${mail.receiverName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Mail Type</span>
                  <span class="detail-value highlight">${mail.mailType}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Description</span>
                  <span class="detail-value">${
                    mail.mailDescription || "—"
                  }</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Created</span>
                  <span class="detail-value">${new Date(
                    mail.insertDateTime
                  ).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Last Updated</span>
                  <span class="detail-value">${new Date(
                    mail.updateDateTime
                  ).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</span>
                </div>
              </div>
              
              <div class="footer">
                <p>This document was automatically generated by Mail Management System</p>
                <p>For inquiries, please contact your system administrator</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px]">
        <DialogHeader className="bg-[#611010] p-4 rounded-t-xl">
          <DialogTitle className="flex items-center gap-2 text-white">
            <MailIcon className="h-5 w-5" />
            <span>Mail Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 p-4">
          <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="mb-2 px-3 py-1 bg-white rounded-md border border-gray-200">
              <img
                src={getBarcodeImageSrc()}
                alt="Barcode"
                className="h-24 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/barcode-placeholder.png";
                }}
              />
            </div>
            <p className="text-lg font-semibold text-gray-900 tracking-wider">
              {mail.trackingNumber}
            </p>
            <p className="text-sm text-[#611010] mt-1">Tracking Number</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
              <Home className="h-5 w-5 text-[#611010] mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Branch Code</p>
                <p className="text-gray-900 font-semibold">{mail.branchCode}</p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
              <User className="h-5 w-5 text-[#611010] mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Sender</p>
                <p className="text-gray-900 font-semibold">{mail.senderName}</p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
              <User className="h-5 w-5 text-[#611010] mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Receiver</p>
                <p className="text-gray-900 font-semibold">
                  {mail.receiverName}
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
              <Type className="h-5 w-5 text-[#611010] mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Mail Type</p>
                <p className="text-gray-900 font-semibold">{mail.mailType}</p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
              <FileText className="h-5 w-5 text-[#611010] mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Description</p>
                <p className="text-gray-900">
                  {mail.mailDescription || "No description provided"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
                <Calendar className="h-5 w-5 text-[#611010] mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Created</p>
                  <p className="text-gray-900 text-sm">
                    {formatDate(mail.insertDateTime)}
                  </p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
                <Calendar className="h-5 w-5 text-[#611010] mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Updated</p>
                  <p className="text-gray-900 text-sm">
                    {formatDate(mail.updateDateTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pt-3 bg-gray-50 border-t border-gray-200 gap-3 rounded-b-xl">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 w-40 h-12"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-[#611010] hover:bg-[#7a1a1a] text-white w-40 h-12"
          >
            <Printer className="mr-2 h-10 w-10" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MailDetailsPopup;
