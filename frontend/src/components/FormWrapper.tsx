import Form1 from "./Form1";
import Form2 from "./Form2";

const FormWrapper: React.FC = () => {
    return (
        <div className="form-wrapper">
            <Form1 />
            <Form2 />
        </div>
    );
}

export default FormWrapper;