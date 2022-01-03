import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createShop, deleteShop, editShop, getShops } from '../../actions/shop';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const Shop = (props) => {
    const [model, setModel] = useState({ shopId: 0, name: "", address: "", type: "" });
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const dispatch = useDispatch();

    const { shops, message } = useSelector(state => ({
        shops: state.shop.shops,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getShops())
            .then(() => { })
            .catch(() => { });
    }, [dispatch, props.history])

    const createRecord = () => {
        dispatch(createShop(model.name, model.address, model.type))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ shopId: 0, name: "", address: "", type: "" })
    }

    const editRecord = () => {
        dispatch(editShop(model.shopId, model.name, model.address, model.type))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteShop(item.shopId))
            .then(() => { })
            .catch(() => { })
    }

    const getUserValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const openPage = (item) => {
        props.history.push("/shopItems/" + item.shopId);
    }

    const openPageTwo = (item) => {
        props.history.push("/statistic/" + item.shopId);
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("shops")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={shops} k="shopId" columns={['name', 'address', 'type']} deleteRecord={deleteRecord} editRecord={getUserValues} openPage={openPage} openPageTwo={openPageTwo}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="address" value={model}
                    setValue={(e) => { setModel({ ...model, "address": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="type" value={model}
                    setValue={(e) => { setModel({ ...model, "type": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="address" value={model}
                    setValue={(e) => { setModel({ ...model, "address": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="type" value={model}
                    setValue={(e) => { setModel({ ...model, "type": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default Shop;