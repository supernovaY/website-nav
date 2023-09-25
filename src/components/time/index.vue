<template>
    <div class="weather">
        <div class="bg-card">
            <div class="clock">{{ currentTime.hour }}<text class="blinking">:</text>{{currentTime.minute}}</div>
            <div class="date">{{ currentTime.month }}月{{ currentTime.day }}日&nbsp;&nbsp;{{currentTime.weekday}}</div>
            <span>{{ weatherByte.weather }}&nbsp;</span>
            <span>{{ weatherByte.temperature }}℃</span>
            <span class="sm-hidden">&nbsp;
          {{
            weatherByte.windDirection?.endsWith("风")
              ? weatherByte.windDirection
              : weatherByte.windDirection + "风"
          }}
        </span>
            <span class="sm-hidden">{{ weatherByte.windPower }}&nbsp;级</span>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, reactive, onBeforeUnmount } from "vue"
    import { getAdCode, getWeather, getOtherWeather } from "@/api/getWeather.js";
    import { getCurrentTime } from "@/utils/getTime.js";

    const currentTime = ref({});
    const timeInterval = ref(null);

    // 高德开发者 Key
    const gaoDeKey = "6d781a11fedccdd97087cbd334abe1f3";

    const cityByte = reactive({
        city: "", // 城市
        adCode: "", // 城市编码
    })

    // 天气数据
    const weatherByte = reactive({
        weather: "", // 天气现象
        temperature: "", // 实时气温
        windDirection: "", // 风向描述
        windPower: "", // 风力级别
    });

    // 获取天气数据
    const getWeatherData = async () => {
        // // 获取地理位置信息
        // if (!gaoDeKey) {
        //   getOtherWeather()
        //     .then((res) => {
        //       console.log('getOtherWeather', res);
        //       const { condition, temp, windDir, windLevel } = res.result.condition;
        //       const { name, cityId } = res.result;
        //       weatherData.adCode = {
        //         city: name,
        //         adCode: cityId,
        //       };
        //       weatherData.weather = {
        //         weather: condition,
        //         temperature: temp,
        //         windDirection: windDir,
        //         windPower: windLevel,
        //       };
        //     })
        //     .catch((err) => {
        //       console.error("天气信息获取失败:" + err);
        //       onError("天气信息获取失败");
        //     });
        // } else {

        // 通过高德获取城市信息
        const { status, city, adcode } = await getAdCode(gaoDeKey);
        if(status === 0){
            console.error("地理位置获取失败:" + err);
            onError("地理位置获取失败");
            return
        }
        cityByte.city = city;
        cityByte.adCode = adcode;

        // 获取天气信息
        const weatherRes = await getWeather(gaoDeKey, adcode);
        const { weather, temperature, winddirection, windpower } = weatherRes.lives[0]
        if(weatherRes.status === 0){
            console.error("天气信息获取失败:" + err);
            onError("天气信息获取失败");
            return
        }
        weatherByte.weather = weather;
        weatherByte.temperature = temperature;
        weatherByte.windDirection = winddirection;
        weatherByte.windPower = windpower;
        // }
    };

    // 报错信息
    const onError = (message) => {
        ElMessage({
            message,
        });
        console.error(message);
    };

    const updateTimeData = () => {
        currentTime.value = getCurrentTime();
    };

    onMounted(() => {
        // 调用获取天气
        getWeatherData();

        // 更新时间
        updateTimeData();
        timeInterval.value = setInterval(updateTimeData, 1000);
    });
    onBeforeUnmount(() => {
        clearInterval(timeInterval.value);
    });
</script>

<style scoped lang="scss">
    .weather {
        .bg-card {
            margin: 0 160px 50px 160px ;
            padding: 10px 0;
            background-color: #00000040;
            backdrop-filter: blur(1px);
            border-radius: 16px;
            @media (max-width: 720px) {
                margin: 0;
            }
            .clock {
                letter-spacing: 2px;
                font-size: 45px;
            }
            .date {
                font-family: 'qiu-hong';
                letter-spacing: 2px;
                font-size: 24px;
            }
            span {
                letter-spacing: 2px;
                font-size: 18px;
            }
            /* 应用闪烁动画到元素 */
            .blinking {
                animation: blink 1.5s infinite; /* 使用闪烁动画，1s 表示每个循环持续 1 秒，infinite 表示无限循环 */
            }
        }
    }

</style>