import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

const initialFormData = {
        isim: "", 
        soyisim: "",
        email: "",
        password: ""
    };

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const errorMessages = {
    isim: "İsim en az 3 karakter uzunluğunda olmalıdır.", 
    soyisim: "Soyisim en az 3 karakter uzunluğunda olmalıdır.",
    email: "Geçerli bir email adresi giriniz.",
    password: "Şifre en az 8 karakter uzunluğunda, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
};

export default function Register() {

  
   const [formData, setFormData] = useState(initialFormData)

   const [errors, setErrors] = useState({ isim: false, 
        soyisim: false,
        email: false,
        password: false});

   const [isValid, setIsValid] = useState(false);
   const [id, setId] = useState(""); 

    useEffect(() => {
      if(formData.isim.trim().length >= 3 
        && formData.soyisim.trim().length >= 3 
        && validateEmail(formData.email) 
        && passwordRegex.test(formData.password)){
        setIsValid(true);
      } else { 
        setIsValid(false)
    }}, [formData]);
  

   const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData({ ...formData, [name]: value });

  if (name === "isim" || name === "soyisim") {
    if (value.trim().length >= 3) {
      setErrors({ ...errors, [name]: false });
    } else {
      setErrors({ ...errors, [name]: true });
    }
  }

  if (name === "email") {
    if (validateEmail(value)) {
      setErrors({ ...errors, [name]: false });
    } else {
      setErrors({ ...errors, [name]: true });
    }
  }

  if (name === "password") {
    if (passwordRegex.test(value)) {
      setErrors({ ...errors, [name]: false });
    } else {
      setErrors({ ...errors, [name]: true });
    }
  }
};
   

function handleSubmit(event) {
  event.preventDefault();
  if (!isValid) return;
  axios.post(
  "https://reqres.in/api/users",
  { name: formData.isim, job: formData.soyisim },
  { headers: { "x-api-key": "reqres-free-v1" } }
)
  .then(response => { 
    setId(response.data.id);
    setFormData(initialFormData);
  })
  .catch(error => console.warn(error));
}

    return (
        <Card>
          <CardBody>
         <CardHeader >Kayıt Ol</CardHeader>
         
    <Form onSubmit={handleSubmit} className="form-container" style={{border: "1px solid #ccc", borderRadius:"5px", padding:"10px",backgroundColor:"#c7c7c7ff"
    }}>

  <FormGroup>
    <Label for="isim">İsim:</Label>
    <Input invalid={errors.isim}
      id="isim"
      name="isim"
      placeholder="İsim giriniz"
      type="text"
      onChange={handleChange}
      value={formData.isim}
      data-cy="isim-input"
    />
     {errors.isim && <FormFeedback data-cy="error-message" >{errorMessages.isim}</FormFeedback>}
  </FormGroup>

  <FormGroup>
    <Label for="soyisim">Soyisim:</Label>
    <Input invalid={errors.soyisim}
      id="soyisim"
      name="soyisim"
      placeholder="Soyisim giriniz"
      type="text"
      onChange={handleChange}
      value={formData.soyisim} 
      data-cy="soyisim-input"
      
    />
      {errors.soyisim && <FormFeedback data-cy="error-message" >{errorMessages.soyisim}</FormFeedback>}
  </FormGroup>

  <FormGroup>
    <Label for="email">Email:</Label>
    <Input invalid={errors.email}
      id="email"
      name="email"
      placeholder="Email giriniz"
      type="email"
      onChange={handleChange}
      value={formData.email}
      data-cy="email-input"
    />
      {errors.email && <FormFeedback data-cy="error-message" >{errorMessages.email}</FormFeedback>}
  </FormGroup>

  <FormGroup>
    <Label for="password">
      Şifre:
    </Label>
    <Input invalid={errors.password}
      id="password"
      name="password"
      placeholder="Şifre giriniz"
      type="password"
      onChange={handleChange}
      value={formData.password}
      data-cy="password-input"
    />
      {errors.password && <FormFeedback data-cy="error-message" >{errorMessages.password}</FormFeedback>}
  </FormGroup>

  
  <Button disabled={!isValid} data-cy="submit-button" type="submit" style={{backgroundColor:"#0088ffff", borderColor:"#6c757dff"}}>
    Kayıt Ol
  </Button>
</Form>
</CardBody>
{ id && <CardFooter data-cy="response-message"> Kayıt başarılı! Kullanıcı ID: {id} </CardFooter>}
</Card>
      
)} 