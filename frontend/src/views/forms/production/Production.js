import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const formSchema = Yup.object({
  weight: Yup.string().required('Please enter a weight'),
  material: Yup.string().required('Please select a material '),
})

const initialValues = {
  material: '',
  weight: '',
}
const Production = () => {
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values)
      const anss = values.material * parseInt(values.weight)
      setCal(anss)
      resetForm()
    },
  })

  const [cal, setCal] = useState()

  const handleCalculate = (e) => {
    e.preventDefault()
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Production of materials</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ padding: '2em' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="mb-3" style={{ width: '45%' }}>
                  <iframe
                    width="710"
                    height="700"
                    frameborder="0"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="no"
                    src="https://calculator.carbonfootprint.com/calculator.aspx?c=flight&h=72f787f00c2c9be452a014a551195d89"
                  ></iframe>
                  {/* <CFormLabel htmlFor="materialSelect">Materials</CFormLabel>
                  <CFormSelect
                    id="materialSelect"
                    name="material"
                    value={values.material}
                    autoFocus={false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.material && !!errors.material}
                    feedbackInvalid="Please select a material"
                    // feedbackValid={touched.material && !!errors.material}
                  >
                    <option value="">Choose material...</option>
                    <option value={1}>Material One</option>
                    <option value={2}>Material Two</option>
                    <option value={3}>Material Three</option>
                  </CFormSelect>
                </div>
                <div className="mb-3" style={{ width: '45%' }}>
                  <CFormLabel htmlFor="weight">Weight</CFormLabel>
                  <div style={{ display: 'flex' }}>
                    <CFormInput
                      name="weight"
                      value={values.weight}
                      autoFocus={false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.weight && !!errors.weight}
                      placeholder="weight"
                      type="number"
                      id="weight"
                      required
                      style={{ width: '85%' }}
                    />
                    <CInputGroupText id="basic-addon2" style={{ width: '15%' }}>
                      kg
                    </CInputGroupText>
                  </div>
                  {touched.weight && errors.weight && (
                    <div className="text-danger">{errors.weight}</div>
                  )} */}
                </div>
              </div>
              {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CButton color="primary" onClick={handleSubmit}>
                  Calculate CO2
                </CButton>
              </div> */}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      {cal && (
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>Calculate value : {cal}</CCardBody>
          </CCard>
        </CCol>
      )}
    </CRow>
  )
}

export default Production
