import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import List from '../ListComponents/List'
import { useTranslation } from 'react-i18next';
import shopService from "../../services/shop.service";


const Statistic = (props) => {
    const id = props.match.params.id;
    const { t } = useTranslation();
    const [statistic, setStatistic] = useState([]);

    useEffect(() => {
        shopService.getStatistic(id)
            .then((responce) => { setStatistic(responce.data) })
            .catch(() => { });
    }, [id])

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("statistic")}</h3></Col>
                </Row>
            </Container>

            <List recorts={statistic} k="key" columns={['key', 'count']} action={false}/>
        </Container>
    );
};

export default Statistic;