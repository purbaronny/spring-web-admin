import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const MemberOrganizationChart = () => {
  const [chartData, setChartData] = useState([['Employee', 'Manager']]);
  
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.post("http://localhost:9000/api/v1/test/member/searchBy", {
          searchBy: "NAME", // example search criteria
          searchCriteria: "",
          page: 0,
          size: 10
        });
        
        const members = response.data.content;
        
        // Prepare data for org chart: Map employee to their manager
        const formattedData = [['Employee', 'Manager']];
        members.forEach(member => {
          formattedData.push([member.employeeName, member.positionName]);
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, []);
  
  return (
    <div className="container">
      <h1>Organization Chart</h1>
      <Chart
        chartType="OrgChart"
        width="100%"
        height="500px"
        data={chartData}
      />
    </div>
  );
};

export default MemberOrganizationChart;