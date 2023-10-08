import { Card, Col, Row } from 'antd'
import React from 'react'
import "../styles/Home.css";

export default function InfoBox() {
  return (
    <Card className='card'>
        <Row justify={'center'}>
            <Col span={8}><img style={{width: '100%', height: '100%'}} src = "/images/grillgif.gif" /></Col>
            <Col span={16}>
              <Row>
                <Col span={24} className="boxtitle">Nutrition Facts</Col>
              </Row>
              <Row>
                <Col span={24}>
                  <span className="itemtitle">Daily Return</span>
                  <span className="itemvalue">10%</span>
                </Col>
                <Col span={24}>
                   <span className="itemtitle">APR</span>
                   <span className="itemvalue">3650%</span>
                </Col>
                <Col span={24}>
                   <span className="itemtitle">Market Fee</span>
                   <span className="itemvalue">5%</span>
                </Col>
              </Row>
            </Col>
        </Row>
    </Card>
  )
}
