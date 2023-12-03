import { BarChart, Card, Title } from "@tremor/react";

const BarChartGraphic = (props) => {
  const { content, color, categories, title, valueFormatter, stack = false } = props;
  // Manejo de NaN
  const cleanData = content.map(item => {
    // Revisa si el objeto tiene solo la llave "name"
    if (Object.keys(item).length === 1 && 'name' in item) {
      // Agrega la nueva llave "niños" con el valor 0
      return { ...item, Jovenes: 0 };
    }
  
    // Si no cumple con la condición, retorna el objeto sin cambios
    return item;
  });

  return (
    <Card>
      <Title>{title}</Title>
      <BarChart
        data={cleanData}
        index="name"
        categories={categories}
        colors={color}
        valueFormatter={valueFormatter}
        stack={stack}
        showAnimation={true}
      />
    </Card>
  );
}

export default BarChartGraphic;
