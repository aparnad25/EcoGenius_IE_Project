import pandas as pd
import plotly.graph_objects as go

CSV_PATH = "vic_nom_last5.csv"
df = pd.read_csv(CSV_PATH)

years = df["FinancialYear"].tolist()
y_vals = df["NetMigrant"].tolist()

covid_year = "2020-21"
covid_y = float(df.loc[df["FinancialYear"] == covid_year, "NetMigrant"].iloc[0])

pos_years = [x for x, y in zip(years, y_vals) if x != covid_year]
pos_vals = [y for x, y in zip(years, y_vals) if x != covid_year]

fig = go.Figure()


fig.add_trace(go.Scatter(
    x=years, y=y_vals,
    mode="lines",
    line=dict(color="#0072B2", width=3),
    hoverinfo="skip",
    showlegend=False
))


fig.add_trace(go.Scatter(
    x=pos_years, y=pos_vals, mode="markers",
    marker=dict(size=8, color="#0072B2", line=dict(color="white", width=1.5)),
    hovertemplate="Year: %{x}<br>Net Migrants: %{y:,}<extra></extra>",
    hoverlabel=dict(bgcolor="#0072B2"),
    showlegend=False
))


fig.add_trace(go.Scatter(
    x=[covid_year], y=[covid_y], mode="markers",
    marker=dict(size=8, color="#d62728", line=dict(color="white", width=1.5)),
    hovertemplate="Year: %{x}<br>Net Migrants: %{y:,}<extra></extra>",
    hoverlabel=dict(bgcolor="#d62728"),
    showlegend=False
))


fig.add_shape(type="line", xref="x", yref="y",
              x0=years[0], x1=years[-1], y0=0, y1=0,
              line=dict(color="#9e9e9e", width=1))


ANNOT_Y_BELOW_TICKS = -0.12
fig.add_annotation(
    x=covid_year, y=ANNOT_Y_BELOW_TICKS,
    xref="x", yref="paper",
    text="Significant drop due to COVID-19",
    showarrow=False,
    font=dict(color="#d62728", size=12),
    align="center"
)


ARROW_LEN = 12000
fig.add_annotation(
    x=covid_year,  y=covid_y - ARROW_LEN,
    xref="x",      yref="y",
    ax=covid_year, ay=covid_y,
    axref="x",     ayref="y",
    showarrow=True,
    arrowcolor="black", arrowwidth=2, arrowhead=2
)


fig.add_annotation(
    x=0, y=-0.30, xref="paper", yref="paper",
    text="Source: Australian Bureau of Statistics",
    showarrow=False, xanchor="left",
    font=dict(color="#6b6b6b", size=14)
)


fig.update_layout(
    title=dict(
        text="Net Overseas Migration in Victoria<br>(2019–20 to 2023–24)",
        x=0.5, xanchor="center", font=dict(size=26)
    ),
    xaxis=dict(
        title=dict(text="Financial Year", font=dict(size=16)),
        categoryorder="array", categoryarray=years,
        ticks="outside",
        showspikes=False, spikemode="across"
    ),
    yaxis=dict(
        title=dict(text="Net Overseas Migrants", font=dict(size=16)),
        tickformat="~s", gridcolor="#e8e8e8", zeroline=False,
        showspikes=False
    ),
    hovermode="closest",
    margin=dict(l=90, r=40, t=110, b=190),
    plot_bgcolor="white"
)

fig.write_html("vic_nom_trend_plotly.html", include_plotlyjs="cdn")
fig.show()