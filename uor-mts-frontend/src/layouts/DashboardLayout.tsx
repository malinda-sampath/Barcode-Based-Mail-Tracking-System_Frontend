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
import { RxAvatar } from "react-icons/rx";
import path from "node:path";

// Super Admin
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <HiOutlineViewGrid className="text-[#F99C30]" />,
  },
  {
    key: "AdminManagement",
    label: "Mail Handler",
    path: "adminmanagement",
    icon: <HiOutlineUsers className="text-[#F99C30]" />,
  },
  {
    key: "mailrecord",
    label: "All Mail Records",
    path: "mainmailcart",
    icon: <HiOutlineShoppingCart className="text-[#F99C30]" />,
  },
  {
    key: "BranchManagement",
    label: "Branches",
    path: "branchmanagement",
    icon: <FaCodeBranch className="text-[#F99C30]" />,
  },
  {
    key: "Logs",
    label: "Logs",
    path: "logs",
    icon: <HiOutlineDocumentText className="text-[#F99C30]" />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "profile",
    label: "Profile",
    path: "profile",
    icon: <RxAvatar className="text-[#F99C30]" />,
  },

  {
    key: "settings",
    label: "Settings",
    path: "settings",
    icon: <HiOutlineCog className="text-[#F99C30]" />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "help",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  },
  {
    key: "logout",
    label: "Logout",
    path: "logout",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  },
];

// Mail Handler
export const ADMIN_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/mail_handler",
    icon: <HiOutlineViewGrid className="text-[#F99C30]" />,
  },

  {
    key: "mailrecord",
    label: "All Mail Records",
    path: "mainmailcart",
    icon: <HiOutlineShoppingCart className="text-[#F99C30]" />,
  },
  {
    key: "MailManagement",
    label: "Daily Mail Cart",
    path: "dailymailcart",
    icon: <HiOutlineCube className="text-[#F99C30]" />,
  },
  {
    key: "claimmails",
    label: "Claim Mails",
    path: "claimmails",
    icon: <MailCheck className="text-[#F99C30]" />,
  },
];

export const ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "profile",
    label: "Profile",
    path: "profile",
    icon: <RxAvatar className="text-[#F99C30]" />,
  },

  {
    key: "settings",
    label: "Settings",
    path: "settings",
    icon: <HiOutlineCog className="text-[#F99C30]" />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "help",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  },

  {
    key: "logout",
    label: "Logout",
    path: "logout",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  },
];

//Branch Manager
export const BRANCH_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/branch",
    icon: <HiOutlineViewGrid className="text-[#F99C30]" />,
  },

  {
    key: "pending",
    label: "Pending Mails",
    path: "pending",
    icon: <HiOutlineAnnotation className="text-[#F99C30]" />,
  },
  {
    key: "allmails",
    label: "Branch Mail Cart",
    path: "allmails",
    icon: <MailIcon className="text-[#F99C30]" />,
  },
];

export const BRANCH_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "profile",
    label: "Profile",
    path: "profile",
    icon: <RxAvatar className="text-[#F99C30]" />,
  },
  {
    key: "settings",
    label: "Settings",
    path: "settings",
    icon: <HiOutlineCog className="text-[#F99C30]" />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "help",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  },
  {
    key: "logout",
    label: "Logout",
    path: "logout",
    icon: <HiOutlineQuestionMarkCircle className="text-[#F99C30]" />,
  }
];
