import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineInbox,
    HiOutlineBookmark,
} from 'react-icons/hi'
import { IoIosContact } from "react-icons/io";


export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    about: <HiOutlineInbox />,
    contact: <IoIosContact />,
    jobPost: <HiOutlineBookmark />,
}

export default navigationIcon
