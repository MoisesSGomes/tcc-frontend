import { useRef, useState } from "react";
import api from "../../services/api.js";
import { 
  ContactContainer, 
  ContactForm, 
  FormTitle, 
  FormGroup, 
  Label, 
  Input, 
  Select, 
  TextArea, 
  SubmitButton, 
  ErrorMessage,
  SuccessMessage,
  FormWrapper
} from "./styles";

function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    helpType: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const formRef = useRef(null);
  
  const helpOptions = [
    { value: "", label: "Selecione uma opção" },
    { value: "Cadastro e Login", label: "Cadastro e Login" },
    { value: "Dúvidas sobre um evento", label: "Dúvidas sobre um evento" },
    { value: "Sugestão ou FeedBack", label: "Sugestão ou FeedBack" },
    { value: "Quero realizar uma denúncia", label: "Quero realizar uma denúncia" }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!formData.helpType) {
      newErrors.helpType = "Selecione como podemos te ajudar";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await api.post("/contato", formData);
      
      // Reset form
      setFormData({
        email: "",
        helpType: "",
        subject: "",
        message: ""
      });
      
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setErrors({ submit: "Não foi possível enviar sua mensagem. Tente novamente mais tarde." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ContactContainer>
      <FormWrapper>
        <FormTitle>Entre em Contato</FormTitle>
        
        {submitSuccess && (
          <SuccessMessage>
            Mensagem enviada com sucesso! Responderemos em breve.
          </SuccessMessage>
        )}
        
        {errors.submit && (
          <ErrorMessage>{errors.submit}</ErrorMessage>
        )}
        
        <ContactForm ref={formRef} onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="seu@email.com" 
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="helpType">Como podemos te ajudar?</Label>
            <Select
              id="helpType"
              name="helpType"
              value={formData.helpType}
              onChange={handleChange}
              $hasError={!!errors.helpType}
            >
              {helpOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.helpType && <ErrorMessage>{errors.helpType}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Assunto</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              placeholder="Assunto da mensagem"
              value={formData.subject}
              onChange={handleChange}
              $hasError={!!errors.subject}
            />
            {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Mensagem</Label>
            <TextArea
              id="message"
              name="message"
              placeholder="Descreva sua mensagem aqui..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              $hasError={!!errors.message}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
          </SubmitButton>
        </ContactForm>
      </FormWrapper>
    </ContactContainer>
  );
}

export default Contact;