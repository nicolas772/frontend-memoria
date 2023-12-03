import React from "react";
import { Card, Text, Title } from "@tremor/react";

const CardHome = (props) => {
   const { color, title, text, imagen } = props
   return (
      <Card
         decoration="top"
         decorationColor={color}>
         <Title style={{
            color: "#435F7A",
            textAlign: "center"
         }}>{title}</Title>
         <img src={imagen} alt="Imagen" style={{ width: '75%', height: 'auto', margin: '0 auto' }}  />
         <Text className="text-center">{text}</Text>
      </Card>
   )
}

export default CardHome