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

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid className="text-[#F99C30]" />,
  },
  {
    key: "AdminManagement",
    label: "Mail Handle",
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
