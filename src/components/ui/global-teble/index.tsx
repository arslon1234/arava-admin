
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
  // Button,
} from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import ShortcutIcon from '@mui/icons-material/Shortcut';
// import { useNavigate } from "react-router-dom";
// import {  useSearchParams } from "react-router-dom";

import { Props } from "@interface";
import { ModalDelete , ModalTest , ModalCountry , ModalBanner , ModalBannerStatus, ModalBrandTaype} from "@modals"
import { Link } from "react-router-dom";


function Index({ heders, body, skelatonLoader }: Props) {

  // const navigate = useNavigate();
  // const [searchPaams] = useSearchParams();
  // const page = Number(searchPaams.get("page")) || 1;
  // const limit = Number(searchPaams.get("limit")) || 10;


  return (
    <>
      
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  {heders?.map((heder, index) => {
                    return (
                      <TableCell key={index}>
                        <TableSortLabel>{heder.title}</TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  skelatonLoader ? Array.from(new Array(5)).map((_, index)=>{
                    return <TableRow key={index}>
                      {
                        heders?.map((_, index2)=>{
                          return <TableCell key={index2}><Skeleton /></TableCell>
                        })
                      }
                    </TableRow> 
                  })

                    :  body?.length > 0 ?  
                    body?.map((body, index)=>{
                      return <TableRow key={index}>
                        {
                          heders?.map((heder, index2)=>{
                            return <TableCell key={index2}>{
                              heder.value == "action" ? <div className="flex items-center gap-2">
                                  <div className=' text-gray-500'><ModalDelete id={body?.id} title="test"/></div>
                                   <ModalTest title="put" id={body?.id} data={body}/>
                                   </div>
                              :heder.value == "action2" ? <div className="flex items-center gap-2">
                                  <div className=' text-gray-500'><ModalDelete id={body?.id} title="country"/></div>
                                  <ModalCountry title="put" id={body?.id} data={body}/>
                              </div>
                              :heder.value == "action3" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="banner"/></div>
                              <ModalBanner title="put" id={body?.id} data={body}/>
                              </div>
                              :heder.value == "brand" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="brand"/></div>
                               <ModalTest title="put" id={body?.id} data={body}/>
                               </div>
                              :heder.value == "brandType" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="brandType"/></div>
                               <ModalBrandTaype title="put" id={body?.id} data={body}/>
                               </div> 
                              :heder.value == "city" ? <div className="flex items-center gap-2">
                               <div className=' text-gray-500'><ModalDelete id={body?.id} title="city"/></div>
                                <ModalTest title="put" id={body?.id} data={body}/>
                              </div> 
                              :heder.value == "country" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="country"/></div>
                               <ModalTest title="put" id={body?.id} data={body}/>
                             </div>
                             :heder.value == "couriers" ? <div className="flex items-center gap-2">
                             <div className=' text-gray-500'><ModalDelete id={body?.id} title="couriers"/></div>
                              <ModalTest title="put" id={body?.id} data={body}/>
                              </div> 
                              : heder.value == "imageUrl" ? <><Link to={`https://webtest.aravva.uz${body?.imageUrl}`} target="_blank"><img className="w-[120px] h-[40px] object-contain" src={`https://webtest.aravva.uz${body?.imageUrl}`} alt="image" /></Link></> 
                              : heder.value == "bannerUrl" ? <><Link to={body?.bannerUrl} target="_blank"><img className="w-[120px] h-[40px] object-contain" src={body?.bannerUrl} alt="image" /></Link></> 
                              : heder.value == "t/r" ? <>{index + 1 }</> //{page * limit -(limit - 1) +index }
                              : heder.value == "activated" ? <div className={body?.activated ? "text-[#008512] flex items-center gap-1" : "text-red-500 flex items-center gap-1"}>{body?.activated ? "Activ" : "Activ emas"}<ModalBannerStatus id={body?.id} text="banner"/></div> 
                              : heder.value == "activated2" ? <div className={body?.activated ? "text-[#008512] flex items-center gap-1" : "text-red-500 flex items-center gap-1"}>{body?.activated ? "Activ" : "Activ emas"}<ModalBannerStatus id={body?.id} text="brandType"/></div> 
                              : (body[heder.value])
                            }</TableCell>
                          })
                        }
                      </TableRow>
                    })
                    : <TableRow>
                      <TableCell colSpan={heders?.length}>No information yet</TableCell>
                    </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default Index;
