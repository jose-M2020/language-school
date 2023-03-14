import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../../theme";

const data = [
  {
    month: "January",
    writing: 90,
    writingColor: "hsl(229, 70%, 50%)",
    reading: 96,
    readingColor: "hsl(296, 70%, 50%)",
    speaking: 72,
    speakingColor: "hsl(97, 70%, 50%)",
    listening: 40,
    listeningColor: "hsl(340, 70%, 50%)",
  },
  {
    month: "February",
    writing: 80,
    writingColor: "hsl(229, 70%, 50%)",
    reading: 66,
    readingColor: "hsl(296, 70%, 50%)",
    speaking: 52,
    speakingColor: "hsl(97, 70%, 50%)",
    listening: 80,
    listeningColor: "hsl(340, 70%, 50%)",
  },
  {
    month: "March",
    writing: 90,
    writingColor: "hsl(229, 70%, 50%)",
    reading: 90,
    readingColor: "hsl(296, 70%, 50%)",
    speaking: 72,
    speakingColor: "hsl(97, 70%, 50%)",
    listening: 80,
    listeningColor: "hsl(340, 70%, 50%)",
  },
  {
    month: "April",
    writing: 80,
    writingColor: "hsl(229, 70%, 50%)",
    reading: 66,
    readingColor: "hsl(296, 70%, 50%)",
    speaking: 52,
    speakingColor: "hsl(97, 70%, 50%)",
    listening: 80,
    listeningColor: "hsl(340, 70%, 50%)",
  },
  {
    month: "May",
    writing: 70,
    writingColor: "hsl(229, 70%, 50%)",
    reading: 86,
    readingColor: "hsl(296, 70%, 50%)",
    speaking: 72,
    speakingColor: "hsl(97, 70%, 50%)",
    listening: 70,
    listeningColor: "hsl(340, 70%, 50%)",
  },
  {
    month: "June",
    writing: 80,
    writingColor: "hsl(229, 70%, 50%)",
    reading: 66,
    readingColor: "hsl(296, 70%, 50%)",
    speaking: 52,
    speakingColor: "hsl(97, 70%, 50%)",
    listening: 80,
    listeningColor: "hsl(340, 70%, 50%)",
  },
  {
    month: "July",
    writing: 80,
    writingColor: "hsl(229, 70%, 50%)",
    reading: 66,
    readingColor: "hsl(296, 70%, 50%)",
    speaking: 52,
    speakingColor: "hsl(97, 70%, 50%)",
    listening: 80,
    listeningColor: "hsl(340, 70%, 50%)",
  },
];

const BarChart = ({ isDashboard = false }) => {
  const colors = tokens();
  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.secondary,
            },
          },
          legend: {
            text: {
              fill: colors.secondary,
            },
          },
          ticks: {
            line: {
              stroke: colors.secondary,
              strokeWidth: 1,
            },
            text: {
              fill: colors.secondary,
            },
          },
        },
        legends: {
          text: {
            fill: colors.secondary,
          },
        },
      }}
      keys={["writing", "reading", "speaking", "listening"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      groupMode="grouped"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Month", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Score", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in month: " + e.indexValue;
      }}
    />
  );
}

export default BarChart