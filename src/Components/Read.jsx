
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import * as Yup from "yup";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FactoryAmico from "../../../assetes/images/svg/Factory-amico 1.svg";
import FactoryRafiki from "../../../assetes/images/svg/Factory-rafiki.svg";
import FittingPiece from "../../../assetes/images/svg/Fitting-piece-bro.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { TextInput } from "../../../components/input/TextInput";
import axiosClient from "../../../axios";
import { useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Formik, Form, ErrorMessage, Field } from "formik";
import AddIcon from '@mui/icons-material/Add';
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import axios from "axios";
const arrayOfData = [{ name: "name" }, { name: "fname" }];
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
 
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));
 
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
 
const ScopeOne = () => {
  const token = useSelector((state) => state.loginData.authtoken);
  const [expanded, setExpanded] = React.useState("panel1");
  const [sideexpanded, setSideExpanded] = React.useState("sidepanel1");
  const [selectedValue, setselectedValue] = React.useState("test");
  const [scopeTitle, setScopeTitle] = React.useState({});
  const [scopeData, setScopeData] = React.useState([]);
  const [uomUnit, setUomUnit] = React.useState([]);
  const [reasons, setReasons] = useState([]);
  const [fileToShow, setFileToShow] = useState("");
  const [anchorElAdd, setAnchorElAdd] = useState(null);
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
  const [fuelType, setFuelType] = useState();
  const [ancorIndexData, setAncorIndexData] = useState()
  const [openSnake, setOpenSnake] = React.useState(false);
  const [subScopeNameHere,setSubScopeNameHere] = useState('');
  const [checkScopeType,setCheckScopeType] = useState('');
  const [scope3SubVAlue,setScope3SubVAlue] = useState("");
  const [scopeTitleWithCount,setScopeTitleWithCount] = useState();
  const [allCountryList,setAllCountryList] = useState();
  const [getScopeThreeVal, setGetScopeThree]  = useState();
  const [scope3AllUOM,setScope3AllUOM] = useState();
  const [scopeIdRef,setScopeIdRef]=useState();
  const [wasteTypes,setWasteTypes] = useState();
  React.useEffect(() => {
    getSubScopeParameterCount('Scope 1');
    getScopeTitle();
    getUOM();
    getReason();
    handleScopeQuestion("Scope 1", "SS01");
    getAllCountryLists();
    wasteTreatmentTypes();
  }, []);
  // create scope 3
  const insertWaste = () =>{
    axiosClient.post(`ghg/add_wastage_response?parameter_id=5345&parameter_name=fgbg&region_id_ref=432423&emission_factor_id_ref=4324234&waste_treatment_type=bbgfbfbfb&activity=bbfggbgf&unit_id_ref=452353&quantity=324232&is_applicable=true`,{
      headers: { Authorization: `Bearer ${token}` },
    }).then(res =>{
    })
  }
  // end create scope 3
  const handleSelectChange = (selectedValue) => {
    setselectedValue(selectedValue);
  };
  const handleChange = (panel, fuelType) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    getUnitOfMaserment(fuelType);
  };
  const handleChangeSidepannel = (sidepannel , scope_name) => (event, newSideExpanded) => {
    getSubScopeParameterCount(scope_name)
    setSideExpanded(newSideExpanded ? sidepannel : false);
  };
 
  const getUOM = () => {
    axiosClient
      .get("ghg/get_unit_of_measurement", 
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUomUnit(res);
      })
      .catch((e) => {});
  };
 
  const getReason = () => {
    axiosClient("esg/view_region_list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setReasons(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const getScopeTitle = () => {
    axiosClient
      .get(`ghg/get_scope`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status === 200) {
          setScopeTitle(res?.data);
        }
      })
      .catch((err) => {});
  };
 
  const getUnitOfMaserment = (fuelType) => {
    axiosClient
      .get(`ghg/get_unit_of_measurement?fuel_type_id=${fuelType}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFuelType(res);
      });
  };
 
  const handleScopeQuestion = (scopeName, qId, subscope_name) => {
    // alert(qId)
    setScopeIdRef(qId)
    axiosClient
      .post(
        `ghg/get_subscope_parameters`,
        {
          scope: scopeName,
          sub_scope_id: qId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res,'checek ressss')
        if (res.status === 200) {
          setSubScopeNameHere(subscope_name)
          setScopeData(res?.data);
        }
      })
      .catch((err) => {
        console.log(err, "errrrrrrrrr");
      });
  };
  const handleImageFile = (e) => {
    setFileToShow(e.target.files[0]);
  };
  const addScope = (val, scope_name, subscope_id) => {
    console.log(scope_name, "checek vall valueeeee")
    var bodyFormData = new FormData();
    bodyFormData.append("supporting_file", fileToShow);
    bodyFormData.append("parameter_id_ref", scope_name);
    bodyFormData.append("parameter_name", subscope_id);
    bodyFormData.append("region_id_ref", val.region);
    bodyFormData.append("unit_id_ref", val.unit_id);
    bodyFormData.append("quantity", val.quantity);
    bodyFormData.append("is_applicable", val.is_applicable);
    bodyFormData.append("comments", val.comment);
    bodyFormData.append("scope_id_ref", scopeIdRef);
    axiosClient
      .post(
        `/v1/scopes/responses`,
        bodyFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if(res.status === 200){
          handleClickSnake()
        }
   
      });
  };
  const handleClickAddmore = (event) => {
    setAnchorElAdd(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElAdd(null);
  };
  const open = Boolean(anchorElAdd);
  const id = open ? "simple-popover" : undefined;
 
  // handle input change
  const handleInputChangeDynamic = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClickDynamic = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClickDynamic = (checkindex) => {
    if (ancorIndexData === checkindex) {
      setInputList([...inputList, { firstName: "", lastName: "" }]);
    }
  };
  const validationSchema = Yup.object({
    comment: Yup.string()
      .required("Comment is require"),
      quantity: Yup.string()
      .required("Quantity is require"),
      region:Yup.string()
      .required("Region is require"),
      unit_id:Yup.string()
      .required("UoM is require"),
      is_applicable:Yup.string()
      .required()
  });
 
  const handleClickSnake = () => {
    setOpenSnake(true);
  };
 
  const handleCloseSnake = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
 
    setOpenSnake(false);
  };
 
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSnake}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnake}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
 
  const scope3FormHandle = (scope, sub_scope_name, sc3_id) =>{
    getUnitForScopeThree(sc3_id)
    checekScope3SubValue(sub_scope_name)
    setCheckScopeType(scope)
  }
 
  const checekScope3SubValue = (sub_val) =>{
    setScope3SubVAlue(sub_val);
  }
 
  const getSubScopeParameterCount = (scope_name) =>{
    axiosClient.get(`ghg/get_subscope_parameter_count?scope=${scope_name}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
      )
    .then(res =>{
      setScopeTitleWithCount(res?.data?.data)
     
    })
  }
 
  const getAllCountryLists = () =>{
    getScopeThree()
    axiosClient.get('esg/view_region_list',{
      headers: { Authorization: `Bearer ${token}` }
    }).then(res =>{
      setAllCountryList(res?.data?.data)
    })
  }
 
  const getScopeThree = () =>{
axiosClient.get('ghg/get_scope',{
  headers: { Authorization: `Bearer ${token}` }
}
).then(res =>{
  setGetScopeThree(res?.data?.data);
})
  }
  const getUnitForScopeThree = (sub_scope) =>{
    axiosClient.post('v1/unit-of-measurment',
    {
      scope_id: sub_scope,
      scope: "Scope 3"
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
    ).then(res =>{
      setScope3AllUOM(res)
      console.log(res , "get uommmmm")
    })
  }
  const wasteTreatmentTypes = () =>{
    axiosClient.get('v1/waste-treatment-types',
    {
      headers: { Authorization: `Bearer ${token}` }
    }
    ).then(res =>{
      setWasteTypes(res)
      console.log(res , "cehcek waste type")
    })
  }
  return (
    <div className="d-flex justify-content-between">
       <Snackbar
        open={openSnake}
        autoHideDuration={600000}
        onClose={handleCloseSnake}
        message="Scope added successfully"
        action={action}
        severity="success"
      />
      <div
        style={{
          width: "30%",
          backgroundColor: "#fff",
          height: "100vh",
          marginTop: 20,
        }}
      >
        <Accordion
         expanded={sideexpanded === "sidepanel1"}
          onChange={handleChangeSidepannel("sidepanel1", 'Scope 1')}
          className="ectended-accordin"
        >
          <AccordionSummary
            aria-controls="sidepanel1d-content"
            id="sidepanel1d-header"
            className={sideexpanded === "sidepanel1" ? `accordian-heading` : ``}
          >
            <div
              className="d-flex justify-content-between"
              style={{ width: "100%" }}
            >
              <div
                className="scope1-heading"
                style={{ paddingTop: sideexpanded === "sidepanel1" ? 0 : 16 }}
              >
                <span>Scope 1</span>
              </div>
              <div>
                <img src={FactoryAmico} width="100%" />
              </div>
            </div>
            {sideexpanded === "sidepanel1" ? (
              <div className="item-count">
                <p>
                  <span>19 |</span> 72
                </p>
              </div>
            ) : (
              ""
            )}
          </AccordionSummary>
          <AccordionDetails>
            {/* {scopeTitle?.data?.["Scope 1"]?.map((res, index1) => { */}
            {console.log(scopeTitleWithCount , "scopeTitleWithCountscopeTitleWithCount")}
            {scopeTitleWithCount?.map((res, index1) =>{
              return (
                <button
                  className="question-btn"
                  onClick={() => handleScopeQuestion("Scope 1", res?.sub_scope_ref, res?.sub_scope)}
                  key={index1}
                >
 
                  <div className="according-item1 d-flex justify-content-between">
                    <div className="accordion-itemcount">
                      <p>{res?.scope_id}</p>
                    </div>
                    <div className="accordion-itemname">
                      <p>{res?.sub_scope}</p>
                    </div>
                    <div className="accordion-itemavilable">
                      <p>
                        <span>{res?.filled} |</span> {res?.full_count}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={sideexpanded === "sidepanel2"}
          onChange={handleChangeSidepannel("sidepanel2", 'Scope 2')}
          className="ectended-accordin"
        >
          <AccordionSummary
            aria-controls="sidepane21d-content"
            id="sidepane21d-header"
            className={sideexpanded === "sidepanel2" ? `accordian-heading` : ``}
          >
            <div
              className="d-flex justify-content-between"
              style={{ width: "100%" }}
            >
              <div
                className="scope1-heading"
                style={{ paddingTop: sideexpanded === "sidepanel2" ? 0 : 16 }}
              >
                <span>Scope 2</span>
              </div>
              <div>
                <img src={FactoryRafiki} width="100%" />
              </div>
            </div>
 
            {sideexpanded === "sidepanel2" ? (
              <div className="item-count">
                <p>
                  <span>19 |</span> 72
                </p>
              </div>
            ) : (
              ""
            )}
          </AccordionSummary>
          <AccordionDetails>
          {scopeTitleWithCount?.map((res, index2) =>{
            {/* {scopeTitle?.data?.["Scope 2"]?.map((res, index2) => { */}
              return (
                <button
                  className="question-btn"
                  onClick={() => handleScopeQuestion("Scope 2",res?.sub_scope_ref)}
                  key={index2}
                >
                  <div className="according-item1 d-flex justify-content-between">
                    <div className="accordion-itemcount">
                      <p>{res?.scope_id}</p>
                    </div>
                    <div className="accordion-itemname">
                      <p>{res?.sub_scope}</p>
                    </div>
                    <div className="accordion-itemavilable">
                      <p>
                        <span>{res?.filled} |</span> {res?.full_count}
                      </p>
                    </div>
                  </div>
               </button>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={sideexpanded === "sidepanel3"}
          onChange={handleChangeSidepannel("sidepanel3", 'Scope 3')}
          className="ectended-accordin"
        >
          <AccordionSummary
            aria-controls="sidepanel3d-content"
            id="sidepanel3d-header"
            className={sideexpanded === "sidepanel3" ? `accordian-heading` : ``}
          >
            <div
              className="d-flex justify-content-between"
              style={{ width: "100%" }}
            >
              <div
                className="scope1-heading"
                style={{ paddingTop: sideexpanded === "sidepanel3" ? 0 : 16 }}
              >
                <span>Scope 3</span>
              </div>
              <div>
                <img src={FittingPiece} width="100%" />
              </div>
            </div>
            {sideexpanded === "sidepanel3" ? (
              <div className="item-count">
                <p>
                  <span>19 |</span> 72
                </p>
              </div>
            ) : (
              ""
            )}
          </AccordionSummary>
          <AccordionDetails>
          {getScopeThreeVal?.['Scope 3']?.map((res, index3) =>{
              return (
                <button className="question-btn" key={index3} onClick={() => scope3FormHandle("Scope 3" ,res?.sub_scope, res?.scope_id)}>
                  <div className="according-item1 ">
                    <div className="accordion-itemname">
                      <p>{res?.sub_scope}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
      {sideexpanded !== "sidepanel3" &&
      <div className="checek-dashedborder"></div>
          }
      <div style={{ width: "65%", height: "auto", marginTop: 20 }}>
        {sideexpanded !== "sidepanel3" ? (
        <div className="question-head">
          <div className="d-flex justify-content-between align-items-baseline">
            <div className="question-listing">
              <p>(A)</p>
            </div>
            <div className="question-name">
              <p>{subScopeNameHere ? subScopeNameHere: scope3SubVAlue}</p>
            </div>
            <div className="question-submitbtn">
              <button>Save</button>
            </div>
            <div className="question-countnumber">
              <p>
                <span>10</span> | <span className="question-countlast">24</span>
              </p>
            </div>
            <div>
              <RemoveCircleIcon className="question-minus" />
            </div>
          </div>
        </div>
) : (
  <div className="question-head">
  <div className="d-flex justify-content-between align-items-baseline">
    <div className="question-listing d-flex">
      <p>(A)</p>
      <p style={{paddingLeft:10}}>{subScopeNameHere ? subScopeNameHere: scope3SubVAlue}</p>
    </div>
    <div className="question-submitbtn">
      <button>Save</button>
    </div>
  </div>
  <div className="scope3-form">
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                }}
              >
                {(formik) => (
                  <>
                      {scope3SubVAlue === 'Waste' ?
                        <Form>
                          <div className="row">
                            <div className="col-md-3 col-sm-12">
                              <div className="d-flex justify-content-between align-item-center">
                                <div>
                                </div>
                                <div></div>
                              </div>
                              <TextInput
                                name={`Wastetype`}
                                label="Wastetype"
                                placeholder="Wastetype" />
                              <ErrorMessage
                                name={`region`}
                                render={(msg) => (
                                  <div className="error">
                                    {" "}
                                    Please select region{" "}
                                  </div>
                                )} />
                            </div>
 
                            <div className="col-md-2 col-sm-12">
                              <div className="d-flex justify-content-between align-item-center">
                                <div>
                                  <label className="form-label">
                                    Region
                                  </label>
                                </div>
                                <div></div>
                              </div>
                              <Field
                                as="select"
                                name={`region`}
                                className="form-resion"
                              >
                                <option>-Select-</option>
                                {allCountryList?.map(
                                  (val, indexopt) => {
                                   return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                              </Field>
                              <ErrorMessage
                                name={`region`}
                                render={(msg) => (
                                  <div className="error">
                                    {" "}
                                    Please select region{" "}
                                  </div>
                                )} />
                            </div>
 
                            <div className="col-md-2 col-sm-12">
                              <div className="d-flex justify-content-between align-item-center">
                                <div>
                                  <label className="form-label">
                                    EF Data
                                  </label>
                                </div>
                                <div></div>
                              </div>
                              <Field
                                as="select"
                                name={`EF Data`}
                                className="form-resion"
                              >
                                <option>-select-</option>
                                <option>US EPA</option>
                                <option>UK DEFRA</option>
                                <option>Custom</option>
                              </Field>
                              <ErrorMessage
                                name={`region`}
                                render={(msg) => (
                                  <div className="error">
                                    {" "}
                                    Please select region{" "}
                                  </div>
                                )} />
                            </div>
 
                            <div className="col-md-3 col-sm-12">
                              <div className="d-flex justify-content-between align-item-center">
                                <div>
                                  <label className="form-label">
                                    Waste Tretement type
                                  </label>
                                </div>
                                <div></div>
                              </div>
                              <Field
                                as="select"
                                name={`Waste Tretement type`}
                                className="form-resion"
                              >
                                <option>-select-</option>
                                <option>Distance</option>
                                <option>Passenger Distance</option>
                                <option>Vehicle Distance</option>
                                <option>Weight Distance</option>
                              </Field>
                              <ErrorMessage
                                name={`region`}
                                render={(msg) => (
                                  <div className="error">
                                    {" "}
                                    Please select region{" "}
                                  </div>
                                )} />
                            </div>
                            <div className="col-md-2 col-sm-12">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
 
                            <div className="col-md-2 col-sm-12">
                              <div className="d-flex justify-content-between align-item-center">
                                <div>
                                  <label className="form-label">
                                    UoM
                                  </label>
                                </div>
                                <div></div>
                              </div>
                              <Field
                                as="select"
                                name={`unit_id`}
                                className="region-select"
                              >
                                <option>-select-</option>
                                {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                              </Field>
                              <ErrorMessage
                                name={`unit_id`}
                                render={(msg) => (
                                  <div className="error">
                                    {" "}
                                    Please select region{" "}
                                  </div>
                                )} />
                            </div>
                            <div className="col-md-3 col-sm-12">
                              <div className="d-flex justify-content-between align-item-center">
                                <div>
                                  <label className="form-label">
                                    Action
                                  </label>
                                </div>
                                <div></div>
                              </div>
                              <Field
                                as="select"
                                name={`Action`}
                                className="form-resion"
                              >
                                <option>-select-</option>
                                <option>Car</option>
                                <option>Air</option>
                                <option>Bus</option>
                                <option>Rail</option>
                                <option>Ferry</option>
                              </Field>
                              <ErrorMessage
                                name={`region`}
                                render={(msg) => (
                                  <div className="error">
                                    {" "}
                                    Please select region{" "}
                                  </div>
                                )} />
                            </div>
                            <div className="col-md-5 col-sm-12">
                              <TextInput
                                name={`quantity`}
                                label="Quantity"
                                placeholder="Quantity" />
                            </div>
                            <div className="row">
                              <div className="col-md-11 ">
                                <TextInput
                                  name={`Comment`}
                                  label="Comment"
                                  placeholder="Comment"
                                  className="comment-feild"
                                />
                              </div>
                              <div className="col-md-1">
                                <button type="submit" className="Add-button" >Add</button>
                              </div>
                            </div>
                          </div>
                        </Form>
                        : ('')}
                    </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                }}
              >
                {(formik) => (
                  <>
               {scope3SubVAlue ==="Business Travel" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Particulars
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Particulars`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              <option>Upstream T&D</option>
                              <option>Employee commute</option>
                              <option>Downstream T&D</option>
 
                            </Field>
                            <ErrorMessage
                              name={`Particulars`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Mode of transportation
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Mode of transportation`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Car</option>
                              <option>Air</option>
                              <option>Bus</option>
                              <option>Rail</option>
                              <option>Ferry</option>
                            </Field>
                            <ErrorMessage
                              name={`Mode of transportation`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-3 col-sm-12">
                            <TextInput
                              name={`From`}
                              label="From"
                              placeholder="From" />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <TextInput
                              name={`quantity`}
                              label="To"
                              placeholder="To" />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  OneWay/Return
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`OneWay/Return`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {fuelType?.data?.data?.map(
                                (val, indexselete) => {
                                  return (
                                    <>
                                      <option
                                        value={val?.unit_id}
                                        key={indexselete}
                                      >
                                        {val.unit_name}
                                      </option>
                                    </>
                                  );
                                }
                              )}
                            </Field>
                            <ErrorMessage
                              name={`OneWay/Return`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Activity
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Activity`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Distance</option>
                              <option>Passenger Distance</option>
                              <option>Vehicle Distance</option>
                              <option>Weight Distance</option>
                            </Field>
                            <ErrorMessage
                              name={`Activity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Type of Transportation
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Type of Transportation`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Car</option>
                              <option>Air</option>
                              <option>Bus</option>
                              <option>Rail</option>
                              <option>Ferry</option>
                            </Field>
                            <ErrorMessage
                              name={`Type of Transportation`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
 
 
 
                          <div className="col-md-4 col-sm-12">
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
</>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                 {(formik) => (
                  <>
                    {scope3SubVAlue === "Purchased Goods and Services" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Purchesed good/service`}
                              label="Purchesed good/service"
                              placeholder="Purchesed good/service" />
                            <ErrorMessage
                              name={`Purchesed good/service`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Supplier/Vendor`}
                              label="Supplier/Vendor"
                              placeholder="Supplier/Vendor" />
                            <ErrorMessage
                              name={`Supplier/Vendor`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                      </>
                       )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "Capital Goods" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                            {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Purchesed good`}
                              label="Purchesed good"
                              placeholder="Purchesed good" />
                            <ErrorMessage
                              name={`Purchesed good`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Supplier/Vendor`}
                              label="Supplier/Vendor"
                              placeholder="Supplier/Vendor" />
                            <ErrorMessage
                              name={`Supplier/Vendor`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="question-checkbox">
 
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
 
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                       </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "Use Of Sold Products" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Sold Goods`}
                              label="Sold Goods"
                              placeholder="Sold Goods" />
                            <ErrorMessage
                              name={`Sold Goods`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Averge Usage over life time`}
                              label="Averge Usage over life time"
                              placeholder="Averge Usage over life time" />
                            <ErrorMessage
                              name={`Averge Usage over life time`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                               </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Product Sales`}
                              label="Product Sales"
                              placeholder="Product Sales" />
                            <ErrorMessage
                              name={`Product Sales`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
 
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
 
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Energy consumed per use`}
                              label="Energy consumed per use"
                              placeholder="Energy consumed per use" />
                            <ErrorMessage
                              name={`Energy consumed per use`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
 
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                         </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "Franchises" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Franchies`}
                              label="Franchies"
                              placeholder="Franchies" />
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                           <Field
                              as="select"
                              name={` EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope1`}
                              label="Scope1"
                              placeholder="Scope1" />
                            <ErrorMessage
                              name={`Scope1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope2`}
                              label="Scope2"
                              placeholder="Scope2" />
                            <ErrorMessage
                              name={`Scope2`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity-1`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity-1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope3`}
                              label="Scope3"
                              placeholder="Scope3" />
                            <ErrorMessage
                              name={`Scope3`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity-2`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity-2`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                           </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "Investments" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Franchies`}
                              label="Franchies"
                              placeholder="Franchies" />
                            <ErrorMessage
                              name={`Franchies`}
                              render={(msg) => (
                                <div className="error">
                                 {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope1`}
                              label="Scope1"
                              placeholder="Scope1" />
                            <ErrorMessage
                              name={`Scope1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope2`}
                              label="Scope2"
                              placeholder="Scope2" />
                            <ErrorMessage
                              name={`Scope2`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity-1`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity-1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12 ">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                           <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                         
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Revenue of the Investee Company`}
                              label="Revenue of the Investee Company"
                              placeholder="Revenue of the Investee Company" />
                            <ErrorMessage
                              name={`Revenue of the Investee Company`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12 ">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Share in the Investee Company`}
                              label="Share in the Investee Company"
                              placeholder="Share in the Investee Company" />
                            <ErrorMessage
                              name={`Share in the Investee Company`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : null}
                              </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
              
                    {scope3SubVAlue === "Up Stream Transportation" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Leased Assets`}
                              label="Leased Assets"
                              placeholder="Leased Assets" />
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope1`}
                              label="Scope1"
                              placeholder="Scope1" />
                            <ErrorMessage
                              name={`Scope1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope2`}
                              label="Scope2"
                              placeholder="Scope2" />
                            <ErrorMessage
                              name={`Scope2`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity-1`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity-1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
 
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                                 </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "End Of Life Of Sold Products" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Product Sold`}
                              label="Product Sold"
                              placeholder="Product Sold" />
                            <ErrorMessage
                              name={`Product Sold`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Waste Tretement type
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Waste Tretement type`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Distance</option>
                              <option>Passenger Distance</option>
                              <option>Vehicle Distance</option>
                              <option>Weight Distance</option>
                            </Field>
                            <ErrorMessage
                              name={`Waste Tretement type`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Activity
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={` Activity`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Distance</option>
                              <option>Passenger Distance</option>
                              <option>Vehicle Distance</option>
                              <option>Weight Distance</option>
                            </Field>
                            <ErrorMessage
                              name={`Activity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
 
 
                          <div className="col-md-5 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                                   </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "Employee Commute Transportation" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Employee Commute
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Employee Commute`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              <option>Upstream T&D</option>
                              <option>Employee commute</option>
                              <option>Downstream T&D</option>
 
                            </Field>
                            <ErrorMessage
                              name={`Employee Commute`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Mode of transportation
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Mode of transportation`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Car</option>
                              <option>Air</option>
                              <option>Bus</option>
                              <option>Rail</option>
                              <option>Ferry</option>
                            </Field>
                            <ErrorMessage
                              name={`Mode of transportation`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                         key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Activity
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Activity`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Distance</option>
                              <option>Passenger Distance</option>
                              <option>Vehicle Distance</option>
                              <option>Weight Distance</option>
                            </Field>
                            <ErrorMessage
                              name={`Activity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Type of Transportation
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Type of Transportation`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Car</option>
                              <option>Air</option>
                              <option>Bus</option>
                              <option>Rail</option>
                              <option>Ferry</option>
                            </Field>
                            <ErrorMessage
                              name={`Type of Transportation`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                                       </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "Down Stream Transportation" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Downstream T&D
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Downstream T&D`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              <option>Upstream T&D</option>
                              <option>Employee commute</option>
                              <option>Downstream T&D</option>
 
                            </Field>
                            <ErrorMessage
                              name={`Downstream T&D`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Mode of transportation
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Mode of transportation`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Car</option>
                              <option>Air</option>
                              <option>Bus</option>
                              <option>Rail</option>
                              <option>Ferry</option>
                            </Field>
                            <ErrorMessage
                              name={`Mode of transportation`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Type of Transportation
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Type of Transportation`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Car</option>
                              <option>Air</option>
                              <option>Bus</option>
                              <option>Rail</option>
                              <option>Ferry</option>
                            </Field>
                            <ErrorMessage
                              name={`Type of Transportation`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                             )} />
                          </div>
 
 
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Activity
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`Activity`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>Distance</option>
                              <option>Passenger Distance</option>
                              <option>Vehicle Distance</option>
                              <option>Weight Distance</option>
                            </Field>
                            <ErrorMessage
                              name={`Activity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
 
                          <div className="col-md-3 col-sm-12">
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                                       </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "Process Sold Products" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Sold Goods`}
                              label="Sold Goods"
                              placeholder="Sold Goods" />
                            <ErrorMessage
                              name={`Sold Goods`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Suppliers/Vendor`}
                              label="Suppliers/Vendor"
                              placeholder="Suppliers/Vendor" />
                            <ErrorMessage
                              name={`Suppliers/Vendor`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  FuelType
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {fuelType?.data?.data?.map(
                                (val, indexselete) => {
                                  return (
                                    <>
                                      <option
                                        value={val?.unit_id}
                                        key={indexselete}
                                      >
                                        {val.unit_name}
                                      </option>
                                    </>
                                  );
                                }
                              )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
 
                  </>
                )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
              
                    {scope3SubVAlue === "Up Stream Assets" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Leased Assets`}
                              label="Leased Assets"
                              placeholder="Leased Assets" />
                            <ErrorMessage
                              name={`Leased Assets`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                           <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope1`}
                              label="Scope1"
                              placeholder="Scope1" />
                            <ErrorMessage
                              name={`Scope1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope2`}
                              label="Scope2"
                              placeholder="Scope2" />
                            <ErrorMessage
                              name={`Scope2`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity-1`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity-1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
 
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                                 </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
              
                    {scope3SubVAlue === "Down Stream Assets" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Leased Assets`}
                              label="Leased Assets"
                              placeholder="Leased Assets" />
                            <ErrorMessage
                              name={`Leased Assets`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope1`}
                              label="Scope1"
                              placeholder="Scope1" />
                            <ErrorMessage
                              name={`Scope1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope2`}
                              label="Scope2"
                              placeholder="Scope2" />
                            <ErrorMessage
                              name={`Scope2`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity-1`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity-1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
 
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                                 </>
                    )}
              </Formik>
              <Formik
                initialValues={{
                  parameter_id: "",
                  parameter_name: "",
                  year: "",
                  region: "",
                  unit_id: "",
                  quantity: "",
                  is_applicable: "",
                  is_available: "",
                  is_submitted: "",
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  
                }}
              >
                {(formik) => (
                  <>
                    {scope3SubVAlue === "Fuel and Energy not in S1 and S2" ?
                      <Form>
                        <div className="row">
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                             </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Activity`}
                              label="Activity"
                              placeholder="Activity" />
                            <ErrorMessage
                              name={`Activity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  Region
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`region`}
                              className="form-resion"
                            >
                              <option>-Select-</option>
                              {allCountryList?.map(
                                  (val, indexopt) => {
                                    return (
                                      <option
                                        value={val?.region_id}
                                        key={indexopt}
                                      >
                                        {val?.region_name}
                                      </option>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`region`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  EF Data
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`EF Data`}
                              className="form-resion"
                            >
                              <option>-select-</option>
                              <option>US EPA</option>
                              <option>UK DEFRA</option>
                              <option>Custom</option>
                            </Field>
                            <ErrorMessage
                              name={`EF Data`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="question-checkbox">
                              <label class="containercheck">
                                Applicable
                                <Field type={"checkbox"} name='applicable' />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope1`}
                              label="Scope1"
                              placeholder="Scope1" />
                            <ErrorMessage
                              name={`Scope1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope2`}
                              label="Scope2"
                              placeholder="Scope2" />
                            <ErrorMessage
                              name={`Scope2`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity-1`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity-1`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
                                <label className="form-label">
                                  UoM
                                </label>
                              </div>
                              <div></div>
                            </div>
                            <Field
                              as="select"
                              name={`unit_id`}
                              className="region-select"
                            >
                              <option>-select-</option>
                              {scope3AllUOM?.data?.data?.map(
                                  (val, indexselete) => {
                                    return (
                                      <>
                                        <option
                                          value={val?.unit_id}
                                          key={indexselete}
                                        >
                                          {val?.unit_name}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                            </Field>
                            <ErrorMessage
                              name={`unit_id`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`Scope3`}
                              label="Scope3"
                              placeholder="Scope3" />
                            <ErrorMessage
                              name={`Scope3`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="d-flex justify-content-between align-item-center">
                              <div>
 
                              </div>
                              <div></div>
                            </div>
                            <TextInput
                              name={`quantity-2`}
                              label="Quantity"
                              placeholder="Quantity" />
                            <ErrorMessage
                              name={`quantity-2`}
                              render={(msg) => (
                                <div className="error">
                                  {" "}
                                  Please select region{" "}
                                </div>
                              )} />
                          </div>
 
                        </div>
                        <div className="row">
                          <div className="col-md-11 ">
                            <TextInput
                              name={`Comment`}
                              label="Comment"
                              placeholder="Comment"
                              className="comment-feild"
                            />
                          </div>
                          <div className="col-md-1">
                            <button type="submit" className="Add-button" >Add</button>
                          </div>
                        </div>
                      </Form>
                      : ('')}
                           </>
                    )}
              </Formik>
             
            </div>
  {/* <div className="scope3-form">
  <Formik
                    initialValues={{
                      parameter_id: "",
                      parameter_name: "",
                      year: "",
                      region: "",
                      unit_id: "",
                      quantity: "",
                      is_applicable: "",
                      is_available: "",
                      is_submitted: "",
                      comment:'',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                    }}
                  >
                    {(formik) => (
                      <Form>
                        <div className="row">
                        <div className="col-md-3 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                        Particulars
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                      name={`region`}
                                      className="form-resion"
                                    >
                                      <option>-Select-</option>
                                      <option>Upstream T&D</option>
                                      <option>Employee commute</option>
                                      <option>Downstream T&D</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`region`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select region{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
 
                                  <div className="col-md-3 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                        Region
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                      name={`region`}
                                      className="form-resion"
                                    >
                                      {console.log(allCountryList , "allCountryListallCountryListallCountryList")}
                                      <option>-Select-</option>
                                      {allCountryList?.map(
                                        (val, indexopt) => {
                                          return (
                                            <option
                                              value={val?.country}
                                              key={indexopt}
                                            >
                                              {val.country}
                                            </option>
                                          );
                                        }
                                      )}
                                    </Field>
                                    <ErrorMessage
                                      name={`region`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select region{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
 
                                  <div className="col-md-3 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                        EF Data
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                     name={`region`}
                                      className="form-resion"
                                    >
                                      <option>-select-</option>
                                      <option>US EPA</option>
                                      <option>UK DEFRA</option>
                                      <option>Custom</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`region`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select region{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
                                  <div className="col-md-2 col-sm-12">
                                  <div className="question-checkbox">
                                <label className="check-container">
                                  Applicable
                                  <Field type="checkbox" name="is_applicable" />
                                  <span className="check-checkmark"></span>
                                </label>
                              </div>
                                  </div>
                                  <div className="col-md-3 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                        Activity
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                      name={`region`}
                                      className="form-resion"
                                    >
                                      <option>-select-</option>
                                      <option>Distance</option>
                                      <option>Passenger Distance</option>
                                      <option>Vehicle Distance</option>
                                      <option>Weight Distance</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`region`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select region{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
 
                                  <div className="col-md-3 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                        Mode of transportation
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                      name={`region`}
                                      className="form-resion"
                                    >
                                      <option>-select-</option>
                                      <option>Car</option>
                                      <option>Air</option>
                                      <option>Bus</option>
                                      <option>Rail</option>
                                      <option>Ferry</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`region`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select region{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
                                        
                                  <div className="col-md-3 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                        Vehicle type
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                      name={`region`}
                                      className="form-resion"
                                    >
                                      <option>-select-</option>
                                      <option>Car</option>
                                      <option>Air</option>
                                      <option>Bus</option>
                                      <option>Rail</option>
                                      <option>Ferry</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`region`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select region{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
 
 
                                 
                                  <div className="col-md-3 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                          UoM
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                      name={`unit_id`}
                                      className="region-select"
                                    >
                                      <option>-select-</option>
                                      {fuelType?.data?.data?.map(
                                        (val, indexselete) => {
                                          return (
                                            <>
                                              <option
                                                value={val?.unit_id}
                                                key={indexselete}
                                              >
                                                {val.unit_name}
                                              </option>
                                            </>
                                          );
                                        }
                                      )}
                                    </Field>
                                    <ErrorMessage
                                      name={`unit_id`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select region{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
 
                                  <div className="col-md-4 col-sm-12">
                                    <TextInput
                                      name={`quantity`}
                                      label="Quantity"
                                      placeholder="Quantity"
                                    />
                                  </div>
 
                                  <div className="col-md-3 col-sm-12">
                                    <label className="form-label">
                                      Upload Document
                                    </label>
                                    <div className="file-input">
                                      <input
                                        type="file"
                                        name="file-input"
                                        id="file-input"
                                        className="file-input__input"
                                        onChange={handleImageFile}
                                      />
                                      <label
                                        className="file-input__label"
                                        htmlFor="file-input"
                                      >
                                        <CloudUploadIcon />
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-9 col-sm-12">
                                    <TextInput
                                      type="text"
                                      name="comment"
                                      // label="Comment"
                                      placeholder="Comment"
                                      className="coment_input"
                                      style={{
                                        borderTop: "none",
                                        borderLeft: "none",
                                        borderRight: "none",
                                        borderBottomColor: "#6E65CF",
                                      }}
                                    />
                                  </div>
                                  <div className="col-md-2 col-sm-12 add_btn">
                                    <button type="submit">Add</button>
                                  </div>
 
                                  
                        </div>
                      </Form>
                    )}
                  </Formik>
  </div> */}
</div>
)}
 
        {sideexpanded !== "sidepanel3" ?
        (scopeData?.data?.map((res, indexmain) => {
          return (
            <>
              {inputList.map((x, i) => {
                return (
                  <Formik
                    initialValues={{
                      parameter_id: "",
                      parameter_name: "",
                      year: "",
                      region: "",
                      unit_id: "",
                      quantity: "",
                      is_applicable: "",
                      is_available: "",
                      is_submitted: "",
                      comment:'',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      addScope(values, res?.parameter_id, res?.scope);
                    }}
                    key={indexmain}
                  >
                    {(formik) => (
                      <Form>
                         <Accordion
                          expanded={expanded === `panel${indexmain}`}
                          onChange={handleChange(
                            `panel${indexmain}`,
                            res?.fuel_type_id_ref
                          )}
                          className="q-acordtion"
                        >
                          <AccordionSummary
                            aria-controls="panel1d-content"
                            id={`panel${indexmain}d-header`}
                          >
                            <div className="d-flex justify-content-between w-100">
                              <div className="stationary-combustion">
                                <span>
                                  0{indexmain + 1} {res?.parameter_name}
                                </span>
                              </div>
                              <div className="question-checkbox">
                                <label className="check-container">
                                  Applicable
                                  <Field type="checkbox" name="is_applicable" />
                                  <span className="check-checkmark"></span>
                                </label>
                                <ErrorMessage
                                      name={`is_applicable`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select applicable{" "}
                                        </div>
                                      )}
                                    />
                              </div>
                            </div>
                          </AccordionSummary>
                       
                          <AccordionDetails>
                            <div className="box" key={i}>
                              <div className="container">
                                <div className="row">
                                  <div className="col-md-2 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                          UoM
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                      name={`unit_id`}
                                      className="region-select"
                                    >
                                      <option>-select-</option>
                                      {fuelType?.data?.data?.map(
                                        (val, indexselete) => {
                                          return (
                                            <>
                                              <option
                                                value={val?.unit_id}
                                                key={indexselete}
                                              >
                                                {val.unit_name}
                                              </option>
                                            </>
                                          );
                                        }
                                      )}
                                    </Field>
                                    <ErrorMessage
                                      name={`unit_id`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select UoM{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
                                  <div className="col-md-4 col-sm-12">
                                    <TextInput
                                      name={`quantity`}
                                      label="Quantity"
                                      placeholder="Quantity"
                                    />
                                  </div>
                                  <div className="col-md-3 col-sm-12">
                                    <div className="d-flex justify-content-between align-item-center">
                                      <div>
                                        <label className="form-label">
                                          Region
                                        </label>
                                      </div>
                                      <div></div>
                                    </div>
                                    <Field
                                      as="select"
                                      name={`region`}
                                      className="form-resion"
                                    >
                                      <option>-select-</option>
                                      {reasons?.map(
                                        (val, indexopt) => {
                                          return (
                                            <option
                                              value={val?.region_id}
                                              key={indexopt}
                                            >
                                              {val.region_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </Field>
                                    <ErrorMessage
                                      name={`region`}
                                      render={(msg) => (
                                        <div className="error">
                                          {" "}
                                          Please select region{" "}
                                        </div>
                                      )}
                                    />
                                  </div>
                                  <div className="col-md-3 col-sm-12">
                                    <label className="form-label">
                                      Upload Document
                                    </label>
                                    <div className="file-input">
                                      <input
                                        type="file"
                                        name="file-input"
                                        id="file-input"
                                        className="file-input__input"
                                        onChange={handleImageFile}
                                      />
                                      <label
                                        className="file-input__label"
                                        htmlFor="file-input"
                                      >
                                        <CloudUploadIcon />
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-9 col-sm-12">
                                    <TextInput
                                      type="text"
                                      name="comment"
                                      label="Comment"
                                      placeholder="Comment"
                                      className="coment_input"
                                      style={{
                                        borderTop: "none",
                                        borderLeft: "none",
                                        borderRight: "none",
                                        borderBottomColor: "#6E65CF",
                                      }}
                                    />
                                  </div>
                                  <div className="col-md-2 col-sm-12 add_btn">
                                    <button type="submit">Add</button>
                                  </div>
                                  <div className="col-md-1 add_btn">
                                    {/* <button
                                      className="add-morebtn"
                                      onClick={handleClickAddmore}
                                    >
                                      <MoreVertIcon htmlColor="red" />
                                    </button> */}
                                    {/* <Popover
                                      className="pop-overbtn"
                                      id={id}
                                      open={open}
                                      anchorEl={anchorElAdd}
                                      onClose={() => handleClose()}
                                      anchorOrigin={{
                                       vertical: "bottom",
                                        horizontal: "left",
                                      }}
                                    > */}
                                      <div className="btn-box d-flex justify-content-between">
                                        {inputList.length !== 1 && (
                                          <div
                                            className="mr10 add-form"
                                            onClick={() =>
                                              handleRemoveClickDynamic(i)
                                            }
                                          >
                                            <RemoveIcon />
                                          </div>
                                        )}
                                        {inputList.length - 1 === i && (
                                          <div
                                            className="add-form"
                                            onClick={() =>
                                              handleAddClickDynamic()
                                            }
                                          >
                                              <AddIcon />
                                          </div>
                                        )}
                                        {/* {setAncorIndexData(indexmain)} */}
                                      </div>
                                    {/* </Popover> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </Form>
                    )}
                  </Formik>
                );
              })}
            </>
          );
        })):("")}
      </div>
    </div>
  );
};
 
export default ScopeOne;
