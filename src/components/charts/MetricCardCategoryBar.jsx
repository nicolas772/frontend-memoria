import { Card, Metric, Text, CategoryBar, Legend, Grid } from "@tremor/react";
import "./css/fixedMargin.css"

export default function MetricCardCategoryBar(props) {
  const { content } = props
  return (
    <Card>
      <Text>{content.title}</Text>
      <Metric>{content.metric}</Metric>
      <CategoryBar
        values={content.subCategoryValues}
        colors={content.subCategroyColors}
        className="mt-2 mb-3"
      />
      <Legend
        categories={content.subCategoryTitles}
        colors={content.subCategroyColors}
        className="mt-2 legend-text"
      />
    </Card>
  );
}