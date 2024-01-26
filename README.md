# Report on the NDDE Project

## Introduction
The Natural Disaster Data Explorer (NDDE) project aims to provide an insightful visualization of various impacts of natural disasters across different countries and years. This report outlines the target user group, their goals and tasks, technologies used in the project, evaluates my approach, and discusses potential improvements, challenges faced, and compromises made during the development process.

## Target User Group:

The target user group is **"Emergency Response Planners and Analysts."**
This group includes professionals and organisations involved in disaster management,
including government agencies, NGOs, and research institutions, who require detailed
historical data on natural disasters to improve preparedness, response strategies and
decision-making.

## User Goals and Tasks:

1. **Historical Analysis:** Users want to analyse historical data to identify patterns in
   disaster occurrences, such as frequency, impact, and affected regions, to aid in risk
   assessment and planning.
2. **Impact Assessment:** They seek to understand the direct and indirect impacts of
   disasters, such as the number of deaths, injuries, people affected, economic losses,
   and infrastructure damage to prioritise response efforts.
3. **Resource Allocation:** Based on the impact data, users need to strategize the
   allocation of resources like emergency funds, response teams, and relief materials
   efficiently.
4. **Educational and Awareness Programs:** For those involved in community
   education, the tool could help create awareness programs by visualising the extent
   and seriousness of natural disasters.
5. **Research and Development:** Researchers in the field of disaster management
   could use the tool for data-driven insights to develop new theories or validate existing
   ones.
6. **Policy Making:** Policymakers could utilise the tool to draft and revise regulations,
   policies, and guidelines for disaster management based on historical data trends.

## Tools and Frameworks Used
- **D3.js**: The primary tool behind the dynamic and interactive data visualizations in this project.
- **JavaScript**: The primary programming language used for scripting on the client side.
- **HTML/CSS**: The skeleton of the webpages, with styles.
- **Python**: Was predominantly used for heavy-lifitng tasks such as sanitizing the data before passing it to JavaScript.
- **GeoJSON**: The JSON-based open standard format designed for representing simple geographical features, along with their non-spatial attributes, was used in the map visualization.
- **JSON**: Was used in some static segments of the code.
- **CSV Data**: The project mostly utilizes Comma-Separated Values (CSV) files for storing and accessing the natural disaster data. This was especially important in order to make the data HXL-compliant.

## HXL Compliance in NDDE
The Humanitarian Exchange Language (HXL) is a data standard designed to improve information sharing during humanitarian crises. HXL operates by adding simple hashtags to existing data, making it easier for different organizations to collaborate and understand the shared data without altering their existing data models. Visit [the official HXL website](https://hxlstandard.org/) for more info.

In the NDDE project, the data utilized is HXL-compliant, ensuring that it adheres to the standards that facilitate humanitarian data exchange and collaboration. By aligning with HXL, the project ensures that the data is structured in a way that is both accessible and interpretable by various humanitarian organizations. This compliance not only enhances the credibility of the data used in the project but also opens avenues for integration with broader humanitarian efforts and data systems.

## Evaluation

### What Could Have Been Done Better
- **Data Handling**: Enhanced error handling and validation could be implemented to manage inconsistencies in the CSV data.
- **User Interface (UI) Design**: The user interface could be made more intuitive, with clearer instructions and feedback to the user, especially when data is loading or when no data is available for the selected parameters.
- **Responsive Design**: Making the design more responsive to cater to different screen sizes would improve the user experience.

### Further Ideas for Implementation
- **Advanced Filtering Options**: Incorporating more complex filtering mechanisms, such as multi-select options for countries or disaster types, would provide deeper insights.
- **Time-Series Analysis**: Adding a time-series component to the visualization could help users understand trends over time.
- **Data Comparison Feature**: Enabling users to compare data between different countries or years could offer more comprehensive insights.

### Difficulties Faced
- **Data Accuracy and Consistency**: Ensuring that the CSV data is accurate, consistent, and well-structured was a challenge. Any discrepancies in data formatting directly affected the visualization output.
- **Dynamic Data Loading**: Handling the dynamic loading of data based on user selections and ensuring the chart updates accurately was a complex task that required careful coding and testing.
- **Cross-Browser Compatibility**: Ensuring that the application works seamlessly across different web browsers presented challenges, especially with varying support for JavaScript and D3.js features.

### Alternatives and Compromises
- **Simplification of Features**: Due to time constraints and complexity, certain advanced features like real-time data updates or extensive interactive capabilities were deferred for future updates.
- **Design Over Functionality**: In some instances, the need to maintain a clean and user-friendly interface took precedence over adding more complex functionalities which might have cluttered the UI.
- **Use of D3.js Over Other Libraries**: The decision to use D3.js, while providing robust visualization capabilities, meant a steeper learning curve and more complex coding compared to simpler libraries like Chart.js. But it was worth it!

## Conclusion
The NDDE project, while successful in its objective to visualize natural disaster data, offers opportunities for further enhancement. The project navigated various technical challenges and made strategic compromises to balance functionality with usability. Future iterations could focus on enhancing data processing capabilities, introducing advanced analytical features, and improving overall user engagement with the platform.