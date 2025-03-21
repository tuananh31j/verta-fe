import { ApexOptions } from 'apexcharts';

export const optionsBarChart = (timeline?: string[]): ApexOptions => {
    return {
        colors: ['#1E40AF', '#16A34A'],
        chart: {
            fontFamily: '"Inter", sans-serif',
            type: 'bar',
            height: 400,
            width: '100%',
            stacked: false,
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                },
            },
            background: '#F8FAFC',
            animations: {
                enabled: true,
                speed: 1000,
                animateGradually: {
                    enabled: true,
                    delay: 200,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 400,
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                borderRadius: 10,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 3,
            colors: ['#ffffff'],
        },
        xaxis: {
            categories: timeline,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#475569',
                    fontSize: '12px',
                    fontWeight: 500,
                },
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Số đơn hàng',
                    style: {
                        color: '#1E40AF',
                        fontSize: '14px',
                        fontWeight: 600,
                    },
                },
                labels: {
                    formatter(value: any) {
                        return value != null ? value.toLocaleString() : '0';
                    },
                    style: {
                        colors: '#475569',
                        fontSize: '12px',
                    },
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Doanh thu (VNĐ)',
                    style: {
                        color: '#16A34A',
                        fontSize: '14px',
                        fontWeight: 600,
                    },
                },
                labels: {
                    formatter(value: any) {
                        return value != null ? `${(value / 1000000).toFixed(1)}M đ` : '0 đ';
                    },
                    style: {
                        colors: '#475569',
                        fontSize: '12px',
                    },
                },
            },
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            markers: {
                size: 12,
                offsetX: -4,
            },
            itemMargin: {
                horizontal: 10,
            },
            labels: {
                colors: '#1E293B',
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                gradientToColors: ['#60A5FA', '#4ADE80'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.8,
                stops: [0, 90],
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            style: {
                fontSize: '12px',
                fontFamily: '"Inter", sans-serif',
            },
            x: {
                show: true,
                format: 'dd MMM yyyy',
            },
            y: {
                formatter(val: any, { seriesIndex }: any) {
                    if (seriesIndex === 1) {
                        return `${val.toLocaleString()} VNĐ`;
                    }
                    return val.toLocaleString();
                },
            },
            marker: {
                show: true,
            },
            theme: 'light',
        },
        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 3,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20,
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'lighten',
                },
            },
            active: {
                filter: {
                    type: 'none',
                },
            },
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    chart: {
                        height: 300,
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '60%',
                        },
                    },
                    legend: {
                        position: 'bottom',
                        horizontalAlign: 'center',
                    },
                },
            },
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 350,
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '50%',
                        },
                    },
                },
            },
        ],
    };
};
