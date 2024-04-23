import * as React from "react";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

import { RemoteCtlCarouselItem } from "../../components/RemoteCtlCarouselItem";
import { window } from "../../constants";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const PAGE_WIDTH = window.width;

function Index() {
  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [data, setData] = React.useState([...new Array(2).keys()]);
  const [isVertical, setIsVertical] = React.useState(false);
  const [isFast, setIsFast] = React.useState(false);
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
      vertical: false,
      width: windowWidth,
      //height: PAGE_WIDTH / 2,
    } as const;

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop
        enabled // Default is true, just for demo
        ref={ref}
        defaultScrollOffsetValue={scrollOffsetValue}
        testID={"xxx"}
        style={{ width: "100%" }}
        autoPlay={false}
        autoPlayInterval={isFast ? 100 : 2000}
        data={data}
        onScrollStart={()=>{console.log('===1')}}
        onScrollEnd={()=>{console.log('===2')}}
        onConfigurePanGesture={g => g.enabled(false)}
        pagingEnabled={true}
        onSnapToItem={index => console.log("current index:", index)}
        renderItem={({ index }) => <RemoteCtlCarouselItem key={index} index={index} pretty={true}/>}
      />
    </SafeAreaView>
  );
}

export default Index;
