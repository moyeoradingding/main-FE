import AnimationCard from './AnimationCard';
import type {
  AnimationCardProps,
  CardTypes,
  IdolCardProps,
} from './card.types';
import IdolCard from './IdolCard';

const CardMap: Record<CardTypes, React.ComponentType<any>> = {
  animation: AnimationCard,
  idol: IdolCard,
};

export default function Card(
  props:
    | ({ type: 'animation' } & Omit<AnimationCardProps, 'type'>)
    | ({ type: 'idol' } & Omit<IdolCardProps, 'type'>),
) {
  const { type, ...rest } = props;
  const Component = CardMap[type];
  return <Component {...rest} />;
}
