import { BarChart, Card, Title } from "@tremor/react";

const BarChartGraphic = (props) => {
  const {content, color, categories, title, valueFormatter, stack=false } = props
  return (
    <Card>
      <Title>{title}</Title>
      <BarChart
        data={content}
        index="name"
        categories={categories}
        colors={color}
        valueFormatter={valueFormatter}
        stack={stack}
        showAnimation={true}
      />
    </Card>
  )
}

export default BarChartGraphic