import React, {useState} from 'react';
import {Form, Input, message, Modal} from "antd";

import { connect } from 'react-redux';
import { UPDATE_CERTIFICATE } from "../../../store/actionTypes";
import { updateCertificate } from "../../../store/api";
import { ActionCreator, PUT } from "../../../store/actionCreators";
import { useDispatch } from 'react-redux'


function UpdateCertificates({data}){
const [ loading, setLoader ] = useState(false);
const dispatch = useDispatch()
    const updateSelectedCertificate = async(values, userId) => {
        const reqData = {
            ...values,
            userId
        }
        setLoader(true)
        const response = await dispatch(PUT(updateCertificate(userId), reqData))
        setLoader(false)
        if(response.code === 200){
            message.success("Certificate updated")
            dispatch(ActionCreator(UPDATE_CERTIFICATE, response.data))
            return true
        }
        message.error("Something went wrong");
        return false
    }

    return (
        <Modal
            visible={true}
            title='Edit certificate'
            okButtonProps={{htmlType: 'submit',loading: loading, form: 'certificate-edit'}}
        >
            <Form
                initialValues={{
                    name_ARM: data.name_ARM,
                    name_ENG: data.name_ENG,
                    course_ARM: data.course_ARM,
                    course_ENG: data.course_ENG,
                    duration: data.duration,
                    date: data.date
                }}
                id='certificate-edit'
                style={{marginTop: 20}}
                onFinish={(values) => updateSelectedCertificate(values, data.userId)}
            >
                <Form.Item label='Name_ARM' name='name_ARM' >
                    <Input/>
                </Form.Item>
                <Form.Item label='Name_ENG' name='name_ENG'>
                    <Input/>
                </Form.Item>
                <Form.Item label='Course_ARM' name='course_ARM'>
                    <Input/>
                </Form.Item>
                <Form.Item label='Course_ENG' name='course_ENG'>
                    <Input/>
                </Form.Item>
                <Form.Item label='Duration' name='duration'>
                    <Input/>
                </Form.Item>
                <Form.Item label='Date' name='date'>
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default connect()(UpdateCertificates)