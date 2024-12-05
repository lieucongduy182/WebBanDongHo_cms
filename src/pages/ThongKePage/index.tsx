import { Flex } from "@chakra-ui/react";
import { max } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { DonHangService } from "../../api/donhang";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";

function createWithMaxValue(value: number): number {
  return Math.ceil(value / 1000) * 1000;
}

const Label = (props: any) => {
  const { x, y, value } = props;

  if (value <= 0) return <></>;
  return (
    <text
      x={x}
      y={y}
      dx={"2%"}
      dy={"-1%"}
      fontSize="15"
      fontWeight="bold"
      fill={"#181818"}
      textAnchor="left"
    >
      {value}
    </text>
  );
};

const tick = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface ChartType {
  x: number;
  y: number;
  fill: string;
}

const ThongKePage = () => {
  const [data, setData] = useState<ChartType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [maxPriceChart, setMaxPriceChart] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await DonHangService.getThongKe();

      const listData = response.data.map((item: number, index: number) => {
        return {
          x: index + 1,
          y: item.toFixed(0),
          fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
        };
      });

      const maxPrice = Number(max(response.data));

      //   setMaxPriceChart(createArrayWithMaxValue(maxKm));
      setMaxPriceChart(createWithMaxValue(maxPrice));
      setData(listData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(maxPriceChart);

  return (
    <PageWrapper>
      <Flex direction={"column"} gap={10}>
        <TitlePage
          title={`Thống kê doanh thu trong năm ${moment().year()}`}
          isShowButtonCreate={false}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <BarChart width={1000} height={500} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              tick={{ fontSize: 14 }}
              dataKey="x"
              type="number"
              domain={[4.5, 13.5]}
              ticks={tick}
              padding={{
                left: 100,
              }}
            />
            <YAxis domain={[0, maxPriceChart]} />
            <Bar dataKey="y" label={<Label />} fill="#6e9c92" />
          </BarChart>
        )}
      </Flex>
    </PageWrapper>
  );
};

export default ThongKePage;
