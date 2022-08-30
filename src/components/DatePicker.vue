<template>
  <div id="datePicker">
    <date-picker
      v-model="start"
      :start="start"
      :get-classes="getRangeClasses"
      :default-value="end || new Date()"
      :disabled-date="disabledStartDate"
      :disabled-time="disabledStartTime"
      type="date"
    ></date-picker>
    <date-picker
      v-model="end"
      :end="end"
      :get-classes="getRangeClasses"
      :default-value="start || new Date()"
      :disabled-date="disabledEndDate"
      :disabled-time="disabledEndTime"
      type="date"
    ></date-picker>
  </div>
</template>

<script>
export default {
    // props: ['start', 'end'],
    props: {
        
    },
    data() {
        return {
            start: null,
            end: null
        };
    },
    methods: {
        getRangeClasses(cellDate, currentDates, classnames) {
            const classes = [];
            const start = this.start && new Date(this.start).setHours(0, 0, 0, 0);
            const end = this.end && new Date(this.end).setHours(0, 0, 0, 0);
            if (
            !/disabled|active|not-current-month/.test(classnames) &&
            start &&
            end &&
            cellDate.getTime() >= start &&
            cellDate.getTime() <= end
            ) {
            classes.push("in-range");
            }
            return classes;
        },
        disabledStartDate(date) {
            return (
            this.end &&
            new Date(date).setHours(0, 0, 0, 0) >
                new Date(this.end).setHours(0, 0, 0, 0)
            );
        },
        disabledEndDate(date) {
            return (
            this.start &&
            new Date(date).setHours(0, 0, 0, 0) <
                new Date(this.start).setHours(0, 0, 0, 0)
            );
        },
        disabledStartTime(date) {
            return this.end && date > this.end;
        },
        disabledEndTime(date) {
            return this.start && date < this.start;
        }
    }
};
</script>

<style>
#datePicker {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>