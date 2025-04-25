import axios from "../components/axioscreds";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { data } from "autoprefixer";
import { PieChart } from '@mui/x-charts/PieChart';

export default function DashboardPage() {
  const [bookingdata, setBookingData] = useState([]);
  const [diagdata, setDiagData] = useState([]);
  const [countDiag, setCountDiag] = useState(0);
  const [countBooking, setCountBooking] = useState(0);
  const [resD, setResD] = useState(0);
  const [resA, setResA] = useState(0);
  const [resS, setResS] = useState(0);
  const [resStress, setResStress] = useState(0);
  const [EmotionalScore, setEmotionalScore] = useState(0);
  const [Depersonalization, setDepersonalization] = useState(0);
  const [personalAccomplishment, setPersonalAccomplishment] = useState(0);
  const [rqemotion , setrqemotion] = useState(0);
  const [rqencouragement , setrqencouragement] = useState(0);
  const [rqproblem , setrqproblem] = useState(0);
  const [countrqlowemotion, setcountrqlowemotion] = useState(0);
  const [countrqmediumemotion, setcountrqmediumemotion] = useState(0);
  const [countrqhighemotion, setcountrqhighemotion] = useState(0);
  const [countrqlowencouragement, setcountrqlowencouragement] = useState(0);
  const [countrqmediumencouragement, setcountrqmediumencouragement] = useState(0);
  const [countrqhighencouragement, setcountrqhighencouragement] = useState(0);
  const [countrqlowproblem, setcountrqlowproblem] = useState(0);
  const [countrqmediumproblem, setcountrqmediumproblem] = useState(0);
  const [countrqhighproblem, setcountrqhighproblem] = useState(0);
  const [countlowEmotionalScore, setcountlowEmotionalScore] = useState(0);
  const [countmediumEmotionalScore, setcountmediumEmotionalScore] = useState(0);
  const [counthighEmotionalScore, setcounthighEmotionalScore] = useState(0);
  const [countlowDepersonalization, setcountlowDepersonalization] = useState(0);
  const [countmediumDepersonalization, setcountmediumDepersonalization] = useState(0);
  const [counthighDepersonalization, setcounthighDepersonalization] = useState(0);
  const [countlowpersonalAccomplishment, setcountlowPersonalAccomplishment] = useState(0);
  const [countmediumpersonalAccomplishment, setcountmediumPersonalAccomplishment] = useState(0);
  const [counthighpersonalAccomplishment, setcounthighPersonalAccomplishment] = useState(0);
  const [countStressLow, setCountStressLow] = useState(0);
  const [countStressMedium, setCountStressMedium] = useState(0);
  const [countStressHigh, setCountStressHigh] = useState(0);
  const [countdlow, setCountdlow] = useState(0);
  const [countdmedium, setCountdmedium] = useState(0);
  const [countdhigh, setCountdhigh] = useState(0);
  const [countalow, setCountalow] = useState(0);
  const [countamedium, setCountamedium] = useState(0);
  const [countahigh, setCountahigh] = useState(0);
  const [countslow, setCountslow] = useState(0);
  const [countsmedium, setCountsmedium] = useState(0);
  const [countshigh, setCountshigh] = useState(0);
  const [lowCount, setLowCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [highCount, setHighCount] = useState(0);
  const [count2qsad, setCount2qSad] = useState(0);
  const [count2qbored, setCount2qBored] = useState(0);
  const [count9qlow, setCount9qlow] = useState(0);
  const [count9qmedium, setCount9qmedium] = useState(0);
  const [count9qhigh, setCount9qhigh] = useState(0);
  const [count8qlow, setCount8qlow] = useState(0);
  const [count8qmedium, setCount8qmedium] = useState(0);
  const [count8qhigh, setCount8qhigh] = useState(0);
  const [selectedFormType, setSelectedFormType] = useState("");

  useEffect(() => {
    const fetchDiagData = async () => {
      try {
        const response = await axios.get(`/forms/all`);
        setDiagData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountDiag = async () => {
      try {
        const response = await axios.get(`/forms/count`);
        const data = response.data.count;
        setCountDiag(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`/appointment/all`);
        setBookingData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountBooking = async () => {
      try {
        const response = await axios.get(`/appointment/count`);
        const data = response.data.count;
        setCountBooking(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountDiag();
    fetchCountBooking();
    fetchDiagData();
    fetchBookingData();
  }, []);

  useEffect(() => {
    // Process data to classify and count levels
    const classifyAndCount = () => {
      let low = 0;
      let medium = 0;
      let high = 0;
  
      let resD = 0;
      let resA = 0;
      let resS = 0;
      let resStress = 0;
      let resEmotionScore = 0;
      let resDepersonal = 0;
      let resPersonalAccomp = 0;
      let resrqemotion = 0;
      let resrqencouragement = 0;
      let resrqproblem = 0;
  
      let dlow = 0, dmedium = 0, dhigh = 0;
      let alow = 0, amedium = 0, ahigh = 0;
      let slow = 0, smedium = 0, shigh = 0;
      let stresslow = 0, stressmedium = 0, stresshigh = 0;
      let lowEmotionScore = 0, mediumEmotionScore = 0, highEmotionScore = 0;
      let lowDepersonal = 0, mediumDepersonal = 0, highDepersonal = 0;
      let lowPersonalAccomp = 0, mediumPersonalAccomp = 0, highPersonalAccomp = 0;
      let lowrqemotion = 0, mediumrqemotion = 0, highrqemotion = 0;
      let lowrqencouragement = 0, mediumrqencouragement = 0, highrqencouragement = 0;
      let lowrqproblem = 0, mediumrqproblem = 0, highrqproblem = 0;

      let count2qSad = 0;
      let count2qBored = 0;
      let count9qlow= 0;
      let count9qmedium = 0;
      let count9qhigh = 0;
      let count8qlow = 0;
      let count8qmedium = 0;
      let count8qhigh = 0;
  
      diagdata.forEach((entry) => {
        if (entry.result) {
          const { d, a, s } = entry.result;
          
          const dNum = Number(d);
          const aNum = Number(a);
          const sNum = Number(s);

          if (entry.forms_type === "2q") {
            for (const [key, value] of Object.entries(entry.result)) {
              if (key === "q1") {
                if (value === true) {
                  count2qSad++;
                }
              }
              if (key === "q2") {
                if (value === true) {
                  count2qBored++;
                  }
              }
            }
          }

          if (entry.forms_type === "9q") {
            for (const [key, value] of Object.entries(entry.result)) {
              if (key === "scores") {
                if (value < 13) {
                  count9qlow++;
                } else if (value >= 13 && value <= 18) {
                  count9qmedium++;
                }
                else {
                  count9qhigh++;
                }
              }
            }
          }

          if (entry.forms_type === "8q") {
            for (const [key, value] of Object.entries(entry.result)) {
              if (key === "scores") {
                if (value < 9) {
                  count8qlow++;
                } else if (value >= 9 && value <= 16) {
                  count8qmedium++;
                }
                else {
                  count8qhigh++;
                }
              }
            }
          }

          if (entry.forms_type === "rq" && entry.result) {
            const { emotionalEndurance, encouragement, problemManagement } = entry.result;
            
            const emotionalEnduranceNum = Number(emotionalEndurance);
            const encouragementNum = Number(encouragement);
            const problemManagementNum = Number(problemManagement);

            resrqemotion += emotionalEnduranceNum;
            resrqencouragement += encouragementNum;
            resrqproblem += problemManagementNum;

            let EmotionScorerank = emotionalEnduranceNum > 34 ? 1 : emotionalEnduranceNum >= 27 ? 2 : 3;
            let Encouragementrank = encouragementNum > 19 ? 1 : encouragementNum >= 14 ? 2 : 3;
            let ProblemManagementrank = problemManagementNum > 18 ? 1 : problemManagementNum >= 13 ? 2 : 3;

            if (EmotionScorerank === 1) highrqemotion++;
            else if (EmotionScorerank === 2) mediumrqemotion++;
            else lowrqemotion++;

            if (Encouragementrank === 1) highrqencouragement++;
            else if (Encouragementrank === 2) mediumrqencouragement++;
            else lowrqencouragement++;

            if (ProblemManagementrank === 1) highrqproblem++;
            else if (ProblemManagementrank === 2) mediumrqproblem++;
            else lowrqproblem++;

            const allValue = emotionalEnduranceNum + encouragementNum + problemManagementNum;
            if (allValue > 69) low++;
            else if (allValue >= 55) medium++;
            else high++;
          }

          if (entry.forms_type === "burnout" && entry.result.scores) {
            const { emotionalScore, depersonalizationScore, personalAchievementScore } = entry.result.scores;
  
            const emotionalScoreNum = Number(emotionalScore);
            const depersonalizationNum = Number(depersonalizationScore);
            const personalAccomplishmentNum = Number(personalAchievementScore);
  
            resEmotionScore += emotionalScoreNum;
            resDepersonal += depersonalizationNum;
            resPersonalAccomp += personalAccomplishmentNum;
  
            let EmotionScorerank = emotionalScoreNum >= 27 ? 3 : emotionalScoreNum >= 17 ? 2 : 1;
            let Depersonalrank = depersonalizationNum >= 13 ? 3 : depersonalizationNum >= 7 ? 2 : 1;
            let PersonalAccomprank = personalAccomplishmentNum >= 39 ? 1 : personalAccomplishmentNum >= 32 ? 2 : 3;
  
            if (EmotionScorerank === 3) highEmotionScore++;
            else if (EmotionScorerank === 2) mediumEmotionScore++;
            else lowEmotionScore++;
  
            if (Depersonalrank === 3) highDepersonal++;
            else if (Depersonalrank === 2) mediumDepersonal++;
            else lowDepersonal++;
  
            if (PersonalAccomprank === 1) highPersonalAccomp++;
            else if (PersonalAccomprank === 2) mediumPersonalAccomp++;
            else lowPersonalAccomp++;
  
            const maxValue = Math.max(EmotionScorerank, Depersonalrank, PersonalAccomprank);
            if (maxValue === 1) low++;
            else if (maxValue === 2) medium++;
            else high++;
          }
  
          if (entry.forms_type === "dass21") {
            resD += dNum;
            resA += aNum;
            resS += sNum;
  
            let drank = 0;
            let arank = 0;
            let srank = 0;
  
            if (dNum >= 0 && dNum <= 6) {
              drank = 1;
              dlow++;
            } else if (dNum >= 7 && dNum <= 13) {
              drank = 2;
              dmedium++;
            } else if (dNum >= 14) {
              drank = 3;
              dhigh++;
            }
  
            if (aNum >= 0 && aNum <= 5) {
              arank = 1;
              alow++;
            } else if (aNum >= 6 && aNum <= 9) {
              arank = 2;
              amedium++;
            } else if (aNum >= 10) {
              arank = 3;
              ahigh++;
            }
  
            if (sNum >= 0 && sNum <= 9) {
              srank = 1;
              slow++;
            } else if (sNum >= 10 && sNum <= 16) {
              srank = 2;
              smedium++;
            } else if (sNum >= 17) {
              srank = 3;
              shigh++;
            }
  
            const maxValue = Math.max(drank, arank, srank);
            if (maxValue === 1) {
              low++;
            } else if (maxValue === 2) {
              medium++;
            } else if (maxValue === 3) {
              high++;
            }
          }
  
          if (entry.forms_type === "stress" && entry.result.scores) {
            const scoreNum = Number(entry.result.scores);
            resStress += scoreNum;
  
            let stressrank = scoreNum <= 25 ? 1 : scoreNum <= 29 ? 2 : 3;
  
            if (stressrank === 1) stresslow++;
            else if (stressrank === 2) stressmedium++;
            else stresshigh++;
  
            if (stressrank === 1) low++;
            else if (stressrank === 2) medium++;
            else high++;
          }
        }
      });
  
      setCount9qlow(count9qlow);
      setCount9qmedium(count9qmedium);
      setCount9qhigh(count9qhigh);
      setCount8qlow(count8qlow);
      setCount8qmedium(count8qmedium);
      setCount8qhigh(count8qhigh);
      setCount2qSad(count2qSad);
      setCount2qBored(count2qBored);
      setResD(resD);
      setResA(resA);
      setResS(resS);
      setCountdlow(dlow);
      setCountdmedium(dmedium);
      setCountdhigh(dhigh);
      setCountalow(alow);
      setCountamedium(amedium);
      setCountahigh(ahigh);
      setCountslow(slow);
      setCountsmedium(smedium);
      setCountshigh(shigh);
      setLowCount(low);
      setMediumCount(medium);
      setHighCount(high);
      setResStress(resStress);
      setCountStressLow(stresslow);
      setCountStressMedium(stressmedium);
      setCountStressHigh(stresshigh);
      setEmotionalScore(resEmotionScore);
      setDepersonalization(resDepersonal);
      setPersonalAccomplishment(resPersonalAccomp);
      setcountlowEmotionalScore(lowEmotionScore);
      setcountmediumEmotionalScore(mediumEmotionScore);
      setcounthighEmotionalScore(highEmotionScore);
      setcountlowDepersonalization(lowDepersonal);
      setcountmediumDepersonalization(mediumDepersonal);
      setcounthighDepersonalization(highDepersonal);
      setcountlowPersonalAccomplishment(lowPersonalAccomp);
      setcountmediumPersonalAccomplishment(mediumPersonalAccomp);
      setcounthighPersonalAccomplishment(highPersonalAccomp);
      setrqemotion(resrqemotion);
      setrqencouragement(resrqencouragement);
      setrqproblem(resrqproblem);
      setcountrqlowemotion(lowrqemotion);
      setcountrqmediumemotion(mediumrqemotion);
      setcountrqhighemotion(highrqemotion);
      setcountrqlowencouragement(lowrqencouragement);
      setcountrqmediumencouragement(mediumrqencouragement);
      setcountrqhighencouragement(highrqencouragement);
      setcountrqlowproblem(lowrqproblem);
      setcountrqmediumproblem(mediumrqproblem);
      setcountrqhighproblem(highrqproblem);
    };
  
    classifyAndCount();
  }, [diagdata]); 

  // Get recent diagnosis data with maximum 5 rows
  const recentDiagnosis = diagdata.slice(0, 5);

  // Get recent booking information with maximum 5 rows
  const recentBookingInfo = bookingdata.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1 flex-row">
        <div className="flex relative w-72">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="p-4 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
              <StatCard
                title="คำขอการจอง"
                value={countBooking}
                color="blue"
                tone="500"
              />
              <StatCard
                title="จำนวนผลการประเมิน"
                value={countDiag}
                color="violet"
              />
              {/* <StatCard title="ระดับปกติ" value={lowCount} color="green" />
              <StatCard
                title="ระดับปานกลาง"
                value={mediumCount}
                color="yellow"
              />
              <StatCard title="ระดับร้ายแรง" value={highCount} color="red" /> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard title="ระดับปกติ" value={lowCount} color="green" />
              <StatCard
                title="ระดับปานกลาง"
                value={mediumCount}
                color="yellow"
              />
              <StatCard title="ระดับร้ายแรง" value={highCount} color="red" />
            </div>
            <div className="text-2xl font-bold">ประเภทของผู้แบบทำแบบประเมินทั้งหมด</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
              <PieChart
                colors={['crimson', 'gold', 'limegreen']} // Use palette
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' },
                    ],
                    innerRadius: 70,
                    outerRadius: 150,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 320,
                    cx: 150,
                    cy: 200,
                  }
                ]}
                width={400}
                height={400}
              />
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                  <StatCard title="ระดับปกติ" value={lowCount} color="green" />
                  <StatCard
                    title="ระดับปานกลาง"
                    value={mediumCount}
                    color="yellow"
                  />
                  <StatCard title="ระดับร้ายแรง" value={highCount} color="red" />
              </div>
            </div>
            <div className="mt-10 border-4 border-[#003087] bg-white rounded-md">
              <div className="flex flex-row bg-[#003087] rounded-md p-4 items-center">
                <div className="text-2xl text-white m-4"> แบบประเมิน : </div>
                <select
                  className="w-[200px] border border-transparent rounded-xl p-2 text-xl bg-blue-600 text-white shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                  onChange={(e) => {
                    setSelectedFormType(e.target.value);
                  }}
                  style={customStyles}
                >
                  <option value="">dass21</option>
                  <option value="burnout">burnout</option>
                  <option value="rq">rq</option>
                  <option value="stress">stress</option>
                  <option value="2Q8Q9Q">2Q8Q9Q</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4 m-10">
                {selectedFormType === "burnout" && (
                  <>
                    <StatCard
                      title="ด้านความอ่อนล้าทางอารมณ์ ระดับต่ำ"
                      value={countlowEmotionalScore}
                      color="green"
                    />
                    <StatCard
                      title="ด้านความอ่อนล้าทางอารมณ์ ระดับปานกลาง"
                      value={countmediumEmotionalScore}
                      color="yellow"
                    />
                    <StatCard
                      title="ด้านความอ่อนล้าทางอารมณ์ ระดับสูง"
                      value={counthighEmotionalScore}
                      color="red"
                    />
                    <StatCard
                      title="ด้านการลดความเป็นบุคคล ระดับต่ำ"
                      value={countlowDepersonalization}
                      color="green"
                    />
                    <StatCard
                      title="ด้านการลดความเป็นบุคคล ระดับปานกลาง"
                      value={countmediumDepersonalization}
                      color="yellow"
                    />
                    <StatCard
                      title="ด้านการลดความเป็นบุคคล ระดับสูง"
                      value={counthighDepersonalization}
                      color="red"
                    />
                    <StatCard
                      title="ด้านความสำเร็จส่วนบุคคล ระดับสูง"
                      value={counthighpersonalAccomplishment}
                      color="green"
                    />
                    <StatCard
                      title="ด้านความสำเร็จส่วนบุคคล ระดับปานกลาง"
                      value={countmediumpersonalAccomplishment}
                      color="yellow"
                    />
                    <StatCard
                      title="ด้านความสำเร็จส่วนบุคคล ระดับต่ำ"
                      value={countlowpersonalAccomplishment}
                      color="red"
                    />
                  </>
                )}
                {selectedFormType === "rq" && (
                  <>
                    <StatCard
                      title="ด้านความทนทานทางอารมณ์ สูงกว่าเกณฑ์ปกติ"
                      value={countrqhighemotion}
                      color="green"
                    />
                    <StatCard
                      title="ด้านความทนทานทางอารมณ์ เกณฑ์ปกติ"
                      value={countrqmediumemotion}
                      color="yellow"
                    />
                    <StatCard
                      title="ด้านความทนทานทางอารมณ์ ต่ำกว่าเกณฑ์ปกติ"
                      value={countrqlowemotion}
                      color="red"
                    />
                    <StatCard
                      title="ด้านกำลังใจ สูงกว่าเกณฑ์ปกติ"
                      value={countrqhighencouragement}
                      color="green"
                    />
                    <StatCard
                      title="ด้านกำลังใจ เกณฑ์ปกติ"
                      value={countrqmediumencouragement}
                      color="yellow"
                    />
                    <StatCard
                      title="ด้านกำลังใจ ต่ำกว่าเกณฑ์ปกติ"
                      value={countrqlowencouragement}
                      color="red"
                    />
                    <StatCard
                      title="ด้านการจัดการกับปัญหา สูงกว่าเกณฑ์ปกติ"
                      value={countrqhighproblem}
                      color="green"
                    />
                    <StatCard
                      title="ด้านการจัดการกับปัญหา เกณฑ์ปกติ"
                      value={countrqmediumproblem}
                      color="yellow"
                    />
                    <StatCard
                      title="ด้านการจัดการกับปัญหา ต่ำกว่าเกณฑ์ปกติ"
                      value={countrqlowproblem}
                      color="red"
                    />
                  </>
                  
                  
                )}
                {selectedFormType === "stress" && (
                  <>
                    <StatCard
                      title="ไม่มีภาวะเครียด & เครียดในระดับปกติ"
                      value={countStressLow}
                      color="green"
                    />
                    <StatCard
                      title="เครียดปานกลาง"
                      value={countStressMedium}
                      color="yellow"
                    />
                    <StatCard
                      title="เครียดมาก"
                      value={countStressHigh}
                      color="red"
                    />
                  </>
                )}
                {selectedFormType === "2Q8Q9Q" && (
                  <>
                    <StatCard
                      title="เศร้า หดหู่ ท้อแท้ ในช่วง 2 สัปดาห์"
                      value={count2qsad}
                      color="green"
                    />
                    <StatCard
                      title="เบื่อ ไม่เพลิดเพลิน ในช่วง 2 สัปดาห์"
                      value={count2qbored}
                      color="yellow"
                    />
                    <br />
                    <StatCard
                      title="ไม่มีหรือมีภาวะซึมเศร้าระดับน้อย"
                      value={count9qlow}
                      color="green"
                    />
                    <StatCard
                      title="มีภาวะซึมเศร้าระดับปานกลาง"
                      value={count9qmedium}
                      color="yellow"
                    />
                    <StatCard
                      title="มีภาวะซึมเศร้าระดับรุนแรง"
                      value={count9qhigh}
                      color="red"
                    />
                    <StatCard
                      title="ไม่มีหรือมีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับน้อย"
                      value={count8qlow}
                      color="green"
                    />
                    <StatCard
                      title="มีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับปานกลาง"
                      value={count8qmedium}
                      color="yellow"
                    />
                    <StatCard
                      title="มีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับรุนแรง"
                      value={count8qhigh}
                      color="red"
                    />
                  </>
                )}
                {selectedFormType === "" && (
                  <>
                    <StatCard
                      title="ความซึมเศร้า ระดับต่ำ"
                      value={countdlow}
                      color="blue"
                    />
                    <StatCard
                      title="ความซึมเศร้า ระดับกลาง"
                      value={countdmedium}
                      color="blue"
                    />
                    <StatCard
                      title="ความซึมเศร้า ระดับร้ายแรง"
                      value={countdhigh}
                      color="blue"
                    />
                    <StatCard
                      title="ความวิตกกังวล ระดับต่ำ"
                      value={countalow}
                      color="violet"
                    />
                    <StatCard
                      title="ความวิตกกังวล ระดับกลาง"
                      value={countamedium}
                      color="violet"
                    />
                    <StatCard
                      title="ความวิตกกังวล ระดับร้ายแรง"
                      value={countahigh}
                      color="violet"
                    />
                    <StatCard
                      title="ความเครียด ระดับต่ำ"
                      value={countslow}
                      color="red"
                    />
                    <StatCard
                      title="ความเครียด ระดับกลาง"
                      value={countsmedium}
                      color="red"
                    />
                    <StatCard
                      title="ความเครียด ระดับร้ายแรง"
                      value={countshigh}
                      color="red"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <DataTable
                title="การจองครั้งล่าสุด"
                data={recentBookingInfo}
                columns={["เลขที่การจอง", "หัวข้อ", "วันที่"]}
                bgColor="green"
              />
              <DataTable
                title="ผลการประเมินครั้งล่าสุด"
                data={recentDiagnosis}
                columns={["เลขที่ผู้ใช้", "ประเภทแบบฟอร์ม", "วันที่"]}
                bgColor="violet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const colors = {
  orange: "bg-orange-400",
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-600",
  violet: "bg-violet-500",
  rose: "bg-rose-400",
  yellow: "bg-yellow-500",
};

const customStyles = {
  dropdownIndicator: (base) => ({
    ...base,
    color: "rgb(255, 255, 255)", // White color
    "&:hover": {
      color: "rgb(255, 255, 255)", // Ensure it stays white on hover
    },
  }),
};

function StatCard({ title, value, color, tone = 400 }) {
  return (
    <div
      className={`flex flex-col justify-between border-4 border-black rounded-md p-4 h-full ${
        colors[color] || "bg-gray-400"
      }`}
    >
      <div className="pb-4 text-lg text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {title}
      </div>
      <div className="text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {value}
      </div>
    </div>
  );
}

function DataTable({ title, data, columns, bgColor }) {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl mb-3 ">{title}</h2>
      <table className="w-full">
        <thead>
          <tr className={`bg-${bgColor}-500 border-2 border-black`}>
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-2 px-4 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white " : "bg-gray-100"}
            >
              {columns.map((col, cellIndex) => {
                let value;
                switch (col) {
                  case "เลขที่การจอง":
                    value = item.booking_id;
                    break;
                  case "หัวข้อ":
                    value = item.topic;
                    break;
                  case "วันที่":
                    value = item.appointment_date || item.created;
                    break;
                  case "เลขที่ผู้ใช้":
                    value = item.user_id;
                    break;
                  case "ประเภทแบบฟอร์ม":
                    value = item.forms_type;
                    break;
                  default:
                    value = "";
                }
                return (
                  <td key={cellIndex} className="py-2 px-4 text-center">
                    {typeof value === "string" && value.includes("T")
                      ? value.substring(0, 10)
                      : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
