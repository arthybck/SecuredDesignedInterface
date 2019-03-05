package fr.tixado_d.secureddesignedinterface.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.ArrayList;

import fr.tixado_d.secureddesignedinterface.Models.Users;
import fr.tixado_d.secureddesignedinterface.R;

public class CustomAdapter extends ArrayAdapter<Users> implements View.OnClickListener{

    private ArrayList<Users> dataSet;
    Context mContext;

    // View lookup cache
    private class ViewHolder {
        TextView txtusername;
    }

    public CustomAdapter(ArrayList<Users> data, Context context) {
        super(context, R.layout.custom_layout, data);
        this.dataSet = data;
        this.mContext=context;

    }

    @Override
    public void onClick(View v) {

        int position=(Integer) v.getTag();
        Object object= getItem(position);
        Users dataModel=(Users) object;
    }

    private int lastPosition = -1;

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Users dataModel = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        ViewHolder viewHolder; // view lookup cache stored in tag

        final View result;

        if (convertView == null) {

            viewHolder = new ViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.custom_layout, parent, false);
            viewHolder.txtusername = (TextView) convertView.findViewById(R.id.username);

            result=convertView;

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
            result=convertView;
        }
        lastPosition = position;

        viewHolder.txtusername.setText(dataModel.getUsername());
        // Return the completed view to render on screen
        return convertView;
    }
}
