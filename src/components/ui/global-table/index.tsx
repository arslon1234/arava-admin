import {
  Table,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableSortLabel,
  Paper,
  Skeleton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TurnRightIcon from "@mui/icons-material/TurnRight";
import { Image } from "antd"; // <-- test jarayonida
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import ShortcutIcon from '@mui/icons-material/Shortcut';
import { useSearchParams } from "react-router-dom";

import { Props } from "@interface";
import { GlobalSwitch, DescriptionText } from "@ui";
import { DrawerCouriers, DrawerCompany } from "@drawers";
import {
  ModalDelete,
  ModalCountry,
  ModalCity,
  ModalBrandTaype,
  ModalRegion,
  ModalCuisines,
  ModalBranchWorkingDaes,
  ModalMenu,
  ModalMenuCategories,
  ModalMenuSection,
  ModalProductsDelete,
} from "@modals";
import { setCookies } from "@cookie";

function Index({ header, body, skelatonLoader }: Props) {
  const navigate = useNavigate();
  const { id, sectionId } = useParams();
  const menuId: string | undefined = id;
  const URL = import.meta.env.VITE_BASE_URL;
  const [searchPaams] = useSearchParams();
  const page = Number(searchPaams.get("page")) || 1;
  const size = Number(searchPaams.get("size")) || 10;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  {header?.map((header, index) => {
                    return (
                      <TableCell key={index}>
                        <TableSortLabel>{header.title}</TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {skelatonLoader ? (
                  Array.from(new Array(5)).map((_, index) => {
                    return (
                      <TableRow key={index}>
                        {header?.map((_, index2) => {
                          return (
                            <TableCell key={index2}>
                              <Skeleton />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : body?.length > 0 ? (
                  body?.map((body, index) => {
                    return (
                      <TableRow key={index}>
                        {header?.map((header, index2) => {
                          return (
                            <TableCell key={index2}>
                              {header.value == "company" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="company"
                                    />
                                  </div>
                                  <DrawerCompany
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "country" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="country"
                                    />
                                  </div>
                                  <ModalCountry
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "banner" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete id={body?.id} title="banner" />
                                  </div>
                                  {/* <ModalBanner title="put" id={body?.id} data={body}/> */}
                                </div>
                              ) : header.value == "brand" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete id={body?.id} title="brand" />
                                  </div>
                                  <div className=" text-gray-500">
                                     <button onClick={()=>{navigate(`/home/brand/${body?.id}`)}}><VisibilityIcon/></button>
                                  </div>
                                  {/* <ModalTest title="put" id={body?.id} data={body}/> */}
                                </div>
                              ) : header.value == "branch" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500 flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        navigate(`/home/branch/${body?.id}`)
                                      }
                                    >
                                      <CalendarMonthIcon />
                                    </button>
                                    <ModalDelete id={body?.id} title="branch" />
                                  </div>
                                  {/* <ModalTest title="put" id={body?.id} data={body}/> */}
                                </div>
                              ) : header.value == "branchWorkingDays" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500 flex items-center gap-2">
                                    <ModalBranchWorkingDaes
                                      id={body?.id}
                                      data={body}
                                    />
                                  </div>
                                  {/* <ModalTest title="put" id={body?.id} data={body}/> */}
                                </div>
                              ) : header.value == "brandType" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="brandType"
                                    />
                                  </div>
                                  <ModalBrandTaype
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "city" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete id={body?.id} title="city" />
                                  </div>
                                  <ModalCity
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "country" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="country"
                                    />
                                  </div>
                                  <ModalCountry
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "couriers" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="couriers"
                                    />
                                  </div>
                                  <DrawerCouriers
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "cuisines" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="cuisines"
                                    />
                                  </div>
                                  <ModalCuisines
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "menu-categories" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="menu-categories"
                                    />
                                  </div>
                                  <ModalMenuCategories
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "menu-section" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="menu-section"
                                    />
                                  </div>
                                  <ModalMenuSection
                                    title="put"
                                    menuSectionId={body?.id}
                                    data={body}
                                  />
                                  <button
                                    className=" text-gray-500"
                                    onClick={() => {
                                      setCookies("branchId", body?.branchId);
                                      navigate(`/home/menu/${ menuId && menuId}/section/${body?.id}`);
                                    }}
                                  >
                                    <TurnRightIcon />
                                  </button>
                                </div>
                              ) : header.value == "region" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete id={body?.id} title="region" />
                                  </div>
                                  <ModalRegion
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                </div>
                              ) : header.value == "menu" ? (
                                <div className="flex items-center gap-2 text-gray-500">
                                  <ModalDelete id={body?.id} title="menu" />{" "}
                                  <ModalMenu
                                    title="put"
                                    id={body?.id}
                                    data={body}
                                  />
                                  <button
                                    onClick={() =>
                                      navigate(`/home/menu/${body?.id}`)
                                    }
                                  >
                                    <TurnRightIcon />
                                  </button>
                                </div>
                              ) : header.value == "product" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalDelete
                                      id={body?.id}
                                      title="products"
                                    />
                                  </div>
                                </div>
                              ) : header.value == "menu-products" ? (
                                <div className="flex items-center gap-2">
                                  <div className=" text-gray-500">
                                    <ModalProductsDelete
                                      productsId={body?.id}
                                      menuSectionId={sectionId}
                                      title="menu-products"
                                    />
                                  </div>
                                </div>
                              ) : header.value == "imageUrl" ? (
                                <>
                                  <Image
                                    width={100}
                                    height={50}
                                    src={
                                      body?.imageUrl
                                        ? `${URL}${body?.imageUrl}`
                                        : "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
                                    }
                                    alt="image"
                                  />
                                </>
                              ) : header.value == "bannerUrl" ? (
                                <>
                                  <Link to={body?.bannerUrl} target="_blank">
                                    <img
                                      className="w-[120px] h-[40px] object-contain"
                                      src={body?.bannerUrl}
                                      alt="image"
                                    />
                                  </Link>
                                </>
                              ) : header.value == "t/r" ? (
                                <>{page * size - (size - 1) + index}</> //<>{index + 1}</>
                              ) : header.value == "activatedBanner" ? (
                                <div>
                                  <GlobalSwitch
                                    activated={body?.activated}
                                    id={body?.id}
                                    text="banner"
                                  />
                                </div>
                              ) : header.value == "activatedBrandType" ? (
                                <div>
                                  <GlobalSwitch
                                    activated={body?.activated}
                                    id={body?.id}
                                    text="brandType"
                                  />
                                </div>
                              ) : header.value == "activatedBrand" ? (
                                <div>
                                  <GlobalSwitch
                                    activated={body?.activated}
                                    id={body?.id}
                                    text="brand"
                                  />
                                </div>
                              ) : header.value == "activatedCompany" ? (
                                <div>
                                  <GlobalSwitch
                                    activated={body?.activated}
                                    id={body?.id}
                                    text="company"
                                  />
                                </div>
                              ) : header.value == "activatedBranch" ? (
                                <div>
                                  <GlobalSwitch
                                    activated={body?.activated}
                                    id={body?.id}
                                    text="branch"
                                  />
                                </div>
                              ) : header.value == "activatedBranchDays" ? (
                                <div>
                                  <GlobalSwitch
                                    activated={body?.open}
                                    id={body?.id}
                                    text="branchDays"
                                  />
                                </div>
                              ) : header.value === "descriptionRu" ? (
                                <div>
                                  <DescriptionText text={body?.descriptionRz} />
                                </div>
                              ) : header.value === "descriptionUz" ? (
                                <div>
                                  <DescriptionText text={body?.descriptionUz} />
                                </div>
                              ) : header.value === "description" ? (
                                <div>
                                  <DescriptionText text={body?.description} />
                                </div>
                              ) : (
                                body[header.value]
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={header?.length}>
                      No information yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default Index;
