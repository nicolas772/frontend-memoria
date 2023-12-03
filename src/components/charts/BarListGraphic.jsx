import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import { RefreshIcon } from '@heroicons/react/solid';

const BarListGraphic = (props) => {
   const {content, valueFormatter, title, columnA, columnB} = props
   // Agregar el icono RefreshIcon a cada elemento de content
   const contentWithIcons = content ? content.map(item => ({
      ...item,
      icon: RefreshIcon,
    })) : [];
   return (
      <Card>
         <Title>{title}</Title>
         <Flex className="mt-4">
            <Text>
               <Bold>{columnA}</Bold>
            </Text>
            <Text>
               <Bold>{columnB}</Bold>
            </Text>
         </Flex>
         <BarList data={contentWithIcons} className="mt-2" valueFormatter={valueFormatter} showAnimation={true} color="blue"/>
      </Card>
   )
}

export default BarListGraphic

