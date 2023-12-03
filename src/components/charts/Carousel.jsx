import { Carousel } from 'flowbite-react';
import { Card, Title } from "@tremor/react";

export default function SimpleCarousel(props) {
  const { content, title } = props
  return (
    <Card
      decoration="top"
      decorationColor="cyan"
      className='pb-2'>
      <Title className='pb-2'>{title}</Title>
      <div className="h-64">
        <Carousel  leftControl rightControl>
          {content.map((item, index) => (
            <div key={index} className="flex h-full pl-2 pr-2 items-center text-center justify-center bg-gray-200 dark:bg-gray-200 text-gray-700">
            "{item}"
          </div>
          ))}
        </Carousel>
      </div>
    </Card>
  );
}
