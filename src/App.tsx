import {useState} from "react";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {Formik, Form} from "formik";
import * as Yup from "yup";

const App = () => {
    const [products, setProducts] = useState([
        {id: 1, name: "محصول یک", count: 0, unitPrice: 120000, discount: 10000, added: false},
        {id: 2, name: "محصول دو", count: 1, unitPrice: 130000, discount: 7000, added: false},
        {id: 3, name: "محصول چهار", count: 2, unitPrice: 140000, discount: 8200, added: false},
        {id: 3, name: "محصول پنج", count: 2, unitPrice: 150000, discount: 8500, added: true},
        {id: 3, name: "محصول شش", count: 2, unitPrice: 160000, discount: 8500, added: false},
    ]);

    const validationSchema = Yup.object({
        buyerName: Yup.string().required("نام خریدار الزامی است"),
        mobile: Yup.string()
            .matches(/^91\d{8}$/, "شماره موبایل باید به صورت 9190719287 باشد")
            .required("موبایل الزامی است"),
        address: Yup.string().required("آدرس الزامی است"),
    });

    const handleInputChange = (id, field, value) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id ? {...product, [field]: value} : product
            )
        );
    };

    const handleAdd = (id) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id ? {...product, count: product.count + 1} : product
            )
        );
    };

    const handleRemove = (id) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id && product.count > 0
                    ? {...product, count: product.count - 1} : product
            )
        );
    };

    const toggleAddButton = (id) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id ? {...product, added: !product.added} : product
            )
        );
    };

    return (
        <Container maxWidth="lg" style={{marginTop: "30px", color: "#fff"}}>
            <Formik
                initialValues={{
                    buyerName: "",
                    mobile: "",
                    address: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("Form Submitted", values);
                }}
            >
                {({errors, touched, handleChange, handleBlur, values}) => (
                    <Form style={{ width: "100%", marginBottom:'30px' }}>
                        {/* Header */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "20px",
                                marginBottom: "10px",
                            }}
                        >
                            {/* Buyer's Name */}
                            <div style={{flex: 1}}>
                                <input
                                    name="buyerName"
                                    value={values.buyerName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="نام خریدار"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        backgroundColor: '#212121',
                                        color: '#fff',
                                        borderRadius: '5px',
                                        border: '1px solid #fff',
                                        textAlign: 'right',
                                    }}
                                />
                                {touched.buyerName && errors.buyerName && (
                                    <span style={{
                                        color: 'red',
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        marginTop: '5px',
                                        display: 'block'
                                    }}>
                        {errors.buyerName}
                    </span>
                                )}
                            </div>

                            {/* Mobile */}
                            <div style={{flex: 1}}>
                                <input
                                    name="mobile"
                                    value={values.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="موبایل"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        backgroundColor: '#212121',
                                        color: '#fff',
                                        borderRadius: '5px',
                                        border: '1px solid #fff',
                                        textAlign: 'right',
                                    }}
                                />
                                {touched.mobile && errors.mobile && (
                                    <span style={{
                                        color: 'red',
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        marginTop: '5px',
                                        display: 'block'
                                    }}>
                        {errors.mobile}
                    </span>
                                )}
                            </div>
                        </div>

                        {/* Address */}
                        <div style={{flex: 1}}>
                            <input
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="آدرس"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: '#212121',
                                    color: '#fff',
                                    borderRadius: '5px',
                                    border: '1px solid #fff',
                                    textAlign: 'right',
                                }}
                            />
                            {touched.address && errors.address && (
                                <span style={{
                                    color: 'red',
                                    fontSize: '0.875rem',
                                    fontWeight: 'bold',
                                    marginTop: '5px',
                                    display: 'block'
                                }}>
                        {errors.address}
                    </span>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>

            <hr style={{border: "1px solid #fff"}} />

            {/* Table */}
            <TableContainer component={Paper} style={{backgroundColor: "#212121"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>
                                نام محصول
                            </TableCell>
                            <TableCell align="center" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>
                                تعداد
                            </TableCell>
                            <TableCell align="center" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>
                                قیمت واحد
                            </TableCell>
                            <TableCell align="center" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>
                                تخفیف
                            </TableCell>
                            <TableCell align="center" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>
                                قیمت کل
                            </TableCell>
                            <TableCell align="center" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>
                                فعالیت
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell align="right">
                                    <TextField
                                        value={product.name}
                                        onChange={(e) =>
                                            handleInputChange(product.id, "name", e.target.value)
                                        }
                                        variant="standard"
                                        style={{
                                            backgroundColor: "#444",
                                            borderRadius: "5px",
                                            color: "#fff",
                                            width: "100%",
                                        }}
                                        inputProps={{
                                            style: {color: "#fff", textAlign: "center"},
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {/* Flex Container for Icons and Count */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "10px",
                                            width: "120px", // Fixed width for the entire container
                                        }}
                                    >
                                        {/* Add Button */}
                                        <div style={{width: "30px", textAlign: "center"}}>
                                            <IconButton
                                                onClick={() => handleAdd(product.id)}
                                                sx={{ color: '#0073A4' ,
                                                    '&:hover': {
                                                        color: '#71c7ec', // Color when hovered
                                                    },}}
                                            >
                                                <AddCircleOutlineIcon sx={{ color: '#0073A4' }}/>
                                            </IconButton>
                                        </div>
                                        {/* Count */}
                                        <div style={{width: "30px", textAlign: "center"}}>
                                            <Typography
                                                variant="body1"
                                                style={{
                                                    color: "#fff",
                                                    textAlign: "center",
                                                    fontSize: "1.2rem", // Adjust font size for count
                                                }}
                                            >
                                                {product.count}
                                            </Typography>
                                        </div>
                                        {/* Remove or Trash Button */}
                                        <div style={{width: "30px", textAlign: "center"}}>
                                            {product.count === 1 ? (
                                                <IconButton
                                                    onClick={() => handleRemove(product.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            ) : product.count > 1 ? (
                                                <IconButton
                                                    onClick={() => handleRemove(product.id)}
                                                    color="error"
                                                >
                                                    <RemoveCircleOutlineIcon/>
                                                </IconButton>
                                            ) : null}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        value={product.unitPrice}
                                        onChange={(e) =>
                                            handleInputChange(
                                                product.id,
                                                "unitPrice",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        type="number"
                                        variant="standard"
                                        style={{
                                            backgroundColor: "#444",
                                            borderRadius: "5px",
                                            color: "#fff",
                                            width: "100%",
                                        }}
                                        inputProps={{
                                            style: {color: "#fff", textAlign: "center"},
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        value={product.discount}
                                        onChange={(e) =>
                                            handleInputChange(
                                                product.id,
                                                "discount",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        type="number"
                                        variant="standard"
                                        style={{
                                            backgroundColor: "#444",
                                            borderRadius: "5px",
                                            color: "limegreen",
                                            width: "100%",
                                        }}
                                        inputProps={{
                                            style: {color: "limegreen", textAlign: "center"},
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        color: "white",
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {((product.unitPrice - product.discount) * product.count).toLocaleString()}
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: product.added
                                                ? "#28a745"
                                                : "#0073A4",
                                            color: "#fff",
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onClick={() => toggleAddButton(product.id)}
                                        onMouseEnter={(e:any) => {
                                            if (product.added) {
                                                e.target.style.backgroundColor = "#dc3545"; // Change to red when hovered if added
                                                e.target.innerText = "حذف"; // Change button text to "حذف" on hover
                                            }
                                        }}
                                        onMouseLeave={(e:any) => {
                                            if (product.added) {
                                                e.target.style.backgroundColor = "#28a745"; // Change back to green if added
                                                e.target.innerText = "اضافه شد"; // Reset button text to "اضافه شد"
                                            } else {
                                                e.target.style.backgroundColor = "#0073A4"; // Default color if not added
                                                e.target.innerText = "افزودن"; // Reset button text to "افزودن"
                                            }
                                        }}
                                    >
                                        {product.added ? "اضافه شد" : "افزودن"} {/* Default text */}
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default App;