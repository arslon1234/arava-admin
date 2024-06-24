
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
import { ModalDelete , ModalTest , ModalCountry } from "@modals"


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
                                  <div className=' text-gray-500'><ModalDelete id={body?.id} title="brand"/></div>
                                   <ModalTest title="put" id={body?.id} data={body}/>
                                   </div>
                              :heder.value == "action2" ? <div className="flex items-center gap-2">
                                  <div className=' text-gray-500'><ModalDelete id={body?.id} title="brand"/></div>
                                  <ModalCountry title="put" id={body?.id} data={body}/>
                              </div>
                              : heder.value == "t/r" ? <>{index + 1 }</> //{page * limit -(limit - 1) +index }
                              : heder.value == "product_id?.name" ? <>{body?.product_id?.name}</> 
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