import { Card, Metric, Text, List, ListItem, Flex, Bold, Grid } from "@tremor/react";
import { CheckCircleIcon, PlusCircleIcon, CheckIcon, RefreshIcon, LightBulbIcon, StarIcon, BookOpenIcon } from '@heroicons/react/solid';
import { ArrowRight, GenderMale, GenderAmbiguous, GenderFemale } from 'react-bootstrap-icons';
export default function MetricCardList(props) {
  const { content, color } = props;

  // Mapa de iconos según los valores del campo "icon"
  const iconMap = {
    activa: CheckCircleIcon,
    creada: PlusCircleIcon,
    finalizado: CheckIcon,
    proceso: RefreshIcon,
    facil: LightBulbIcon,
    medio: LightBulbIcon,
    dificil: LightBulbIcon,
    hombre: GenderMale,
    mujer: GenderFemale,
    noIdentificado: GenderAmbiguous,
    score: StarIcon,
    palabras: BookOpenIcon,
    hits: BookOpenIcon,
  };
  const iconColorMap = {
    activa: "green",       // Verde para indicar algo activo
    creada: "grey",        // Gris para indicar algo creado pero no activo
    finalizado: "#3399FF",    // Azul para indicar algo finalizado
    proceso: "orange",     // Naranja para indicar algo en proceso (puedes usar un color asociado a la acción de carga o movimiento)
    facil: "green",
    medio: "#FFD700",
    dificil: "red",
    hombre: "green",
    mujer: "purple",
    noIdentificado: "grey",
    score: "#ffc107",
    palabras: "#3399FF",
    hits: "orange",
  };

  return (
    <Card
      decoration="top"
      decorationColor={color}>
      <Text>{content.title}</Text>
      <Metric className="mt-2">{content.metric}</Metric>
      <Flex className="mt-4">
        <Text>
          <Bold>{content.columnName1}</Bold>
        </Text>
        <Text>
          <Bold>{content.columnName2}</Bold>
        </Text>
      </Flex>
      <List className="mt-2">
        {content.data.map((item) => {
          // Obtén el componente de icono correspondiente
          const IconComponent = iconMap[item.icon] || CheckCircleIcon;
          const IconColor = iconColorMap[item.icon] || "black"
          return (
            <ListItem key={item.name}>
              <IconComponent className="metric-card-icon" color={IconColor} />
              <Flex justifyContent="start" className="truncate space-x-2.5">
                <Text className="truncate">{item.name}</Text>
              </Flex>
              <Text>{item.stat}</Text>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
