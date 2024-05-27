import { useField } from 'formik'
import './Select.css'

interface SelectProps {
    name: string
    children: React.ReactNode
}

const Select: React.FC<SelectProps> = ({ name, children }) => {
    const [field] = useField(name)
    return (
        <select {...field} className="select">
            {children}
        </select>
    )
}

export default Select