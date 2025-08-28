import { useEffect, useState } from "react";
import {
  Button, Card, CardBody, CardHeader, Form, FormFeedback, FormGroup, Input, Label
} from "reactstrap";

const initialFormData = {
  isim: "",
  soyisim: "",
};

const errorMessages = {
  isim: "İsim en az 3 karakter olmalı.",
  soyisim: "Soyisim en az 3 karakter olmalı.",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({
    isim: false,
    soyisim: false,
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isimOk = formData.isim.trim().length >= 3;
    const soyisimOk = formData.soyisim.trim().length >= 3;

    setIsValid(isimOk && soyisimOk);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "isim" || name === "soyisim") {
      const ok = value.trim().length >= 3;
      setErrors((prev) => ({ ...prev, [name]: !ok }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("Form gönderiliyor:", formData);
  };

  return (
    <Card>
      <CardHeader>Kayıt Ol (Yarı Tamamlandı)</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit} className="form-container"
          style={{ border: "1px solid #ccc", borderRadius: 5, padding: 10, backgroundColor: "#c7c7c7ff" }}>

          <FormGroup>
            <Label for="isim">İsim:</Label>
            <Input
              id="isim"
              name="isim"
              placeholder="İsim giriniz"
              type="text"
              value={formData.isim}
              onChange={handleChange}
              invalid={errors.isim}
              data-cy="isim-input"
            />
            {errors.isim && <FormFeedback data-cy="error-message">{errorMessages.isim}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="soyisim">Soyisim:</Label>
            <Input
              id="soyisim"
              name="soyisim"
              placeholder="Soyisim giriniz"
              type="text"
              value={formData.soyisim}
              onChange={handleChange}
              invalid={errors.soyisim}
              data-cy="soyisim-input"
            />
            {errors.soyisim && <FormFeedback data-cy="error-message">{errorMessages.soyisim}</FormFeedback>}
          </FormGroup>

          <Button type="submit" disabled={!isValid} data-cy="submit-button"
            style={{ backgroundColor: "#0088ffff", borderColor: "#6c757dff" }}>
            Kayıt Ol
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
