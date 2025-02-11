import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

import { FaCodeBranch } from "react-icons/fa";

import { FaUsers } from "react-icons/fa";
import { MailCheck, MailIcon } from "lucide-react";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid className="text-[#F99C30]" />,
  },
  {
    key: "AdminManagement",
    label: "Admin Management",
    path: "/adminmanagement",
    icon: <FaUsers className="text-[#F99C30]" />,
  },
  {
    key: "BranchManagement",
    label: "Branch Management",
    path: "/branchmanagement",
    icon: <FaCodeBranch className="text-[#F99C30]" />,
  },
];

export const ADMIN_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid className="text-[#F99C30]" />,
  },
  {
    key: "MailManagement",
    label: "Mail Management",
    path: "/mailmanagement",
    icon: <MailIcon className="text-[#F99C30]" />,
  },
  {
    key: "claimmails",
    label: "Claim Mails",
    path: "/claimmails",
    icon: <MailCheck className="text-[#F99C30]" />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog className="text-[#F99C30]" />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/help",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  },
];

export const ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog className="text-[#F99C30]" />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/help",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  },
];

export const BRANCH_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid className="text-[#F99C30]" />,
  },
  {
    key: "allmails",
    label: "All Mails",
    path: "/allmails",
    icon: <MailIcon className="text-[#F99C30]" />,
  },
 
];

export const BRANCH_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog className="text-[#F99C30]" />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/help",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  },
];
